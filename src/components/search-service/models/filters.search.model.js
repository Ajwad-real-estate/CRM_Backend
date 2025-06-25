export class Filter {
  constructor(queryUrl) {
    this.queryUrl = queryUrl;
    this.query = '';
    this.filters = {};
    this.whereConditions = [];
    this.splitFilters();
  }

  // Static method to create filter from URL and return WHERE conditions directly
  static getWhereFromUrl(url) {
    const filter = new Filter(url);
    return filter.getWhereClause();
  }

  splitFilters() {
    // Handle different URL formats
    let query;
    if (this.queryUrl.includes('?')) {
      query = this.queryUrl.split('?')[1];
    } else if (this.queryUrl.includes('=')) {
      query = this.queryUrl;
    } else {
      return;
    }

    if (!query) return;

    const params = query.split('&').reduce((acc, param) => {
      const [key, value] = param.split('=');
      if (key) acc[key] = decodeURIComponent(value ?? '');
      return acc;
    }, {});

    this.filters = { ...params };
    
    // Build WHERE conditions
    this.buildWhereConditions();
  }

  buildWhereConditions() {
    this.whereConditions = [];
    
    // Add filter conditions
    Object.entries(this.filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        this.whereConditions.push(this.createWhereCondition(key, value));
      }
    });
  }

  createWhereCondition(key, value) {
    // Map filter keys to database columns and create appropriate WHERE conditions
    const columnMapping = {
      'category': 'pc.category_name',
      'city': 'c."name"',
      'project': 'p."name"',
      'min_price': 'a.price',
      'max_price': 'a.price',
      'price': 'a.price',
      'min_space': 'a.space',
      'max_space': 'a.space',
      'space': 'a.space',
      'instant_delivery': 'a.instant_delivery',
      'payment_method': 'a.payment_method',
      'building_type': 'b."name"',
      'type': 'b."name"',
      'bedrooms': 'a.bedrooms',
      'bathrooms': 'a.bathrooms',
      'garden': 'a.garden',
      'elevator': 'a.elevator',
      'unit_rent_sale': 'a.unit_rent_sale',
      'unit_finish': 'a.unit_finish',
      'unit_view': 'a.unit_view',
      'unit_floor': 'a.unit_floor',
      'status': 'a.status',
      'region' : 'a.street'
    };

    const column = columnMapping[key] || `a.${key}`;
    const convertedValue = this.convertValue(key, value);
    
    // Handle different condition types
    switch (key) {
      case 'min_price':
      case 'min_space':
        return `${column} >= ${convertedValue}`;
      
      case 'max_price':
      case 'max_space':
        return `${column} <= ${convertedValue}`;
      
      case 'price':
      case 'space':
      case 'bedrooms':
      case 'bathrooms':
      case 'unit_floor':
        return `${column} = ${convertedValue}`;
      
      case 'instant_delivery':
      case 'garden':
      case 'elevator':
        return `${column} = ${convertedValue}`;
      
      case 'city':
      case 'project':
      case 'building_type':
      case 'type':
      case 'category':
      case 'payment_method':
      case 'unit_rent_sale':
      case 'unit_finish':
      case 'unit_view':
      case 'status':
        return `${column} = '${convertedValue}'`;
      
      default:
        // For custom fields, detect if it's numeric or string
        if (typeof convertedValue === 'number') {
          return `${column} = ${convertedValue}`;
        } else if (typeof convertedValue === 'boolean') {
          return `${column} = ${convertedValue}`;
        } else {
          return `${column} = '${convertedValue}'`;
        }
    }
  }

  sanitizeValue(value) {
    // Basic SQL injection prevention - escape single quotes
    return String(value).replace(/'/g, "''");
  }

  // Convert string values to appropriate types for PostgreSQL
  convertValue(key, value) {
    // Define which fields should be treated as numbers
    const numericFields = [
      'price', 'min_price', 'max_price',
      'space', 'min_space', 'max_space',
      'bedrooms', 'bathrooms',
      'unit_floor'
    ];

    // Define which fields should be treated as booleans
    const booleanFields = [
      'instant_delivery', 'garden', 'elevator'
    ];

    if (numericFields.includes(key)) {
      // Convert to number, remove any non-numeric characters except decimal point
      const numValue = parseFloat(value.toString().replace(/[^\d.-]/g, ''));
      return isNaN(numValue) ? 0 : numValue;
    }

    if (booleanFields.includes(key)) {
      // Convert to boolean
      return value === 'true' || value === '1' || value === 1;
    }

    // Return as string for other fields
    return this.sanitizeValue(value);
  }

  convertToQuery() {
    const queryString = Object.entries(this.filters)
      .filter(([key, value]) => value !== null && value !== undefined && value !== '')
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');

    this.query = '' + queryString;
    
    // Rebuild WHERE conditions when query changes
    this.buildWhereConditions();
  }

  getQuery() {
    return this.query;
  }

  // Get WHERE clause as string
  getWhereClause() {
    if (this.whereConditions.length === 0) return '';
    return 'WHERE ' + this.whereConditions.join(' AND ');
  }

  // Get WHERE conditions as array
  getWhereConditions() {
    return [...this.whereConditions];
  }

  // Add custom WHERE condition
  addWhereCondition(condition) {
    this.whereConditions.push(condition);
  }

  // Clear WHERE conditions
  clearWhereConditions() {
    this.whereConditions = [];
  }

  // Get filters
  getFilters() {
    return { ...this.filters };
  }

  // Set a filter
  setFilter(key, value) {
    this.filters[key] = value;
    this.buildWhereConditions();
  }

  // Remove a filter
  removeFilter(key) {
    delete this.filters[key];
    this.buildWhereConditions();
  }

  // Clear all filters
  clearFilters() {
    this.filters = {};
    this.buildWhereConditions();
  }

  // Clear everything
  clearAll() {
    this.filters = {};
    this.whereConditions = [];
  }

  // Get SQL-ready WHERE clause with proper formatting
  getSqlWhereClause() {
    if (this.whereConditions.length === 0) return '';
    return 'WHERE \n  ' + this.whereConditions.join(' AND \n  ');
  }
}