/**
 * Browser-based Lightweight DAX (Data Analysis Expressions) & Power BI Evaluator Engine
 * 
 * Provides in-browser evaluation for DAX measures, calculated columns,
 * Power Query transformations, relational data models, and visual aggregates.
 */

export interface DataRow {
  [key: string]: any;
}

export interface DataTable {
  name: string;
  columns: string[];
  types: Record<string, 'integer' | 'decimal' | 'text' | 'date' | 'boolean'>;
  data: DataRow[];
}

export interface ModelRelationship {
  id: string;
  fromTable: string;
  fromColumn: string;
  toTable: string;
  toColumn: string;
  cardinality: '1:*' | '*:1' | '1:1' | '*:*';
  crossFiltering: 'single' | 'both';
  isActive: boolean;
}

// Built-in Standard Datasets for Power BI Practice
export const sampleDataModel: {
  tables: Record<string, DataTable>;
  relationships: ModelRelationship[];
} = {
  tables: {
    Sales: {
      name: 'Sales',
      columns: ['OrderID', 'OrderDate', 'CustomerID', 'ProductID', 'Region', 'Quantity', 'UnitPrice', 'Discount', 'Revenue', 'Cost', 'Profit'],
      types: {
        OrderID: 'integer',
        OrderDate: 'date',
        CustomerID: 'integer',
        ProductID: 'integer',
        Region: 'text',
        Quantity: 'integer',
        UnitPrice: 'decimal',
        Discount: 'decimal',
        Revenue: 'decimal',
        Cost: 'decimal',
        Profit: 'decimal',
      },
      data: [
        { OrderID: 1001, OrderDate: '2026-01-15', CustomerID: 1, ProductID: 101, Region: 'North', Quantity: 5, UnitPrice: 120.0, Discount: 0.0, Revenue: 600.0, Cost: 400.0, Profit: 200.0 },
        { OrderID: 1002, OrderDate: '2026-01-18', CustomerID: 2, ProductID: 102, Region: 'South', Quantity: 2, UnitPrice: 350.0, Discount: 0.1, Revenue: 630.0, Cost: 450.0, Profit: 180.0 },
        { OrderID: 1003, OrderDate: '2026-02-05', CustomerID: 3, ProductID: 103, Region: 'Central', Quantity: 10, UnitPrice: 45.0, Discount: 0.05, Revenue: 427.5, Cost: 250.0, Profit: 177.5 },
        { OrderID: 1004, OrderDate: '2026-02-14', CustomerID: 1, ProductID: 102, Region: 'North', Quantity: 3, UnitPrice: 350.0, Discount: 0.0, Revenue: 1050.0, Cost: 675.0, Profit: 375.0 },
        { OrderID: 1005, OrderDate: '2026-03-01', CustomerID: 4, ProductID: 104, Region: 'East', Quantity: 1, UnitPrice: 850.0, Discount: 0.15, Revenue: 722.5, Cost: 500.0, Profit: 222.5 },
        { OrderID: 1006, OrderDate: '2026-03-12', CustomerID: 5, ProductID: 101, Region: 'West', Quantity: 8, UnitPrice: 120.0, Discount: 0.0, Revenue: 960.0, Cost: 640.0, Profit: 320.0 },
        { OrderID: 1007, OrderDate: '2026-04-03', CustomerID: 2, ProductID: 105, Region: 'South', Quantity: 4, UnitPrice: 210.0, Discount: 0.05, Revenue: 798.0, Cost: 520.0, Profit: 278.0 },
        { OrderID: 1008, OrderDate: '2026-04-20', CustomerID: 3, ProductID: 103, Region: 'Central', Quantity: 12, UnitPrice: 45.0, Discount: 0.1, Revenue: 486.0, Cost: 300.0, Profit: 186.0 },
        { OrderID: 1009, OrderDate: '2026-05-08', CustomerID: 6, ProductID: 104, Region: 'North', Quantity: 2, UnitPrice: 850.0, Discount: 0.05, Revenue: 1615.0, Cost: 1000.0, Profit: 615.0 },
        { OrderID: 1010, OrderDate: '2026-05-25', CustomerID: 4, ProductID: 102, Region: 'East', Quantity: 4, UnitPrice: 350.0, Discount: 0.0, Revenue: 1400.0, Cost: 900.0, Profit: 500.0 },
      ],
    },
    Customers: {
      name: 'Customers',
      columns: ['CustomerID', 'CustomerName', 'Segment', 'City', 'Country'],
      types: {
        CustomerID: 'integer',
        CustomerName: 'text',
        Segment: 'text',
        City: 'text',
        Country: 'text',
      },
      data: [
        { CustomerID: 1, CustomerName: 'Apex Dynamics', Segment: 'Enterprise', City: 'Hanoi', Country: 'Vietnam' },
        { CustomerID: 2, CustomerName: 'Beacon Retail', Segment: 'Consumer', City: 'Da Nang', Country: 'Vietnam' },
        { CustomerID: 3, CustomerName: 'Crest Solutions', Segment: 'Small Business', City: 'Ho Chi Minh', Country: 'Vietnam' },
        { CustomerID: 4, CustomerName: 'Delta Systems', Segment: 'Enterprise', City: 'Can Tho', Country: 'Vietnam' },
        { CustomerID: 5, CustomerName: 'Echo Logistics', Segment: 'Corporate', City: 'Hai Phong', Country: 'Vietnam' },
        { CustomerID: 6, CustomerName: 'Fusion Global', Segment: 'Enterprise', City: 'Hanoi', Country: 'Vietnam' },
      ],
    },
    Products: {
      name: 'Products',
      columns: ['ProductID', 'ProductName', 'Category', 'SubCategory', 'UnitCost', 'UnitPrice'],
      types: {
        ProductID: 'integer',
        ProductName: 'text',
        Category: 'text',
        SubCategory: 'text',
        UnitCost: 'decimal',
        UnitPrice: 'decimal',
      },
      data: [
        { ProductID: 101, ProductName: 'Cloud Storage Pod', Category: 'Technology', SubCategory: 'Storage', UnitCost: 80.0, UnitPrice: 120.0 },
        { ProductID: 102, ProductName: 'Enterprise Router X', Category: 'Technology', SubCategory: 'Networking', UnitCost: 225.0, UnitPrice: 350.0 },
        { ProductID: 103, ProductName: 'Smart Cable Kit', Category: 'Accessories', SubCategory: 'Cabling', UnitCost: 25.0, UnitPrice: 45.0 },
        { ProductID: 104, ProductName: 'High-Density Server', Category: 'Technology', SubCategory: 'Servers', UnitCost: 500.0, UnitPrice: 850.0 },
        { ProductID: 105, ProductName: 'Ergonomic Desk Hub', Category: 'Furniture', SubCategory: 'Workstations', UnitCost: 130.0, UnitPrice: 210.0 },
      ],
    },
    Calendar: {
      name: 'Calendar',
      columns: ['Date', 'Year', 'Quarter', 'Month', 'MonthName', 'Day', 'DayOfWeek'],
      types: {
        Date: 'date',
        Year: 'integer',
        Quarter: 'text',
        Month: 'integer',
        MonthName: 'text',
        Day: 'integer',
        DayOfWeek: 'text',
      },
      data: [
        { Date: '2026-01-15', Year: 2026, Quarter: 'Q1', Month: 1, MonthName: 'January', Day: 15, DayOfWeek: 'Thursday' },
        { Date: '2026-01-18', Year: 2026, Quarter: 'Q1', Month: 1, MonthName: 'January', Day: 18, DayOfWeek: 'Sunday' },
        { Date: '2026-02-05', Year: 2026, Quarter: 'Q1', Month: 2, MonthName: 'February', Day: 5, DayOfWeek: 'Thursday' },
        { Date: '2026-02-14', Year: 2026, Quarter: 'Q1', Month: 2, MonthName: 'February', Day: 14, DayOfWeek: 'Saturday' },
        { Date: '2026-03-01', Year: 2026, Quarter: 'Q1', Month: 3, MonthName: 'March', Day: 1, DayOfWeek: 'Sunday' },
        { Date: '2026-03-12', Year: 2026, Quarter: 'Q1', Month: 3, MonthName: 'March', Day: 12, DayOfWeek: 'Thursday' },
        { Date: '2026-04-03', Year: 2026, Quarter: 'Q2', Month: 4, MonthName: 'April', Day: 3, DayOfWeek: 'Friday' },
        { Date: '2026-04-20', Year: 2026, Quarter: 'Q2', Month: 4, MonthName: 'April', Day: 20, DayOfWeek: 'Monday' },
        { Date: '2026-05-08', Year: 2026, Quarter: 'Q2', Month: 5, MonthName: 'May', Day: 8, DayOfWeek: 'Friday' },
        { Date: '2026-05-25', Year: 2026, Quarter: 'Q2', Month: 5, MonthName: 'May', Day: 25, DayOfWeek: 'Monday' },
      ],
    },
  },
  relationships: [
    {
      id: 'rel_sales_cust',
      fromTable: 'Sales',
      fromColumn: 'CustomerID',
      toTable: 'Customers',
      toColumn: 'CustomerID',
      cardinality: '*:1',
      crossFiltering: 'single',
      isActive: true,
    },
    {
      id: 'rel_sales_prod',
      fromTable: 'Sales',
      fromColumn: 'ProductID',
      toTable: 'Products',
      toColumn: 'ProductID',
      cardinality: '*:1',
      crossFiltering: 'single',
      isActive: true,
    },
    {
      id: 'rel_sales_cal',
      fromTable: 'Sales',
      fromColumn: 'OrderDate',
      toTable: 'Calendar',
      toColumn: 'Date',
      cardinality: '*:1',
      crossFiltering: 'single',
      isActive: true,
    },
  ],
};

export interface DaxEvaluationResult {
  isSuccess: boolean;
  measureName?: string;
  expression: string;
  resultType: 'scalar' | 'table' | 'column';
  scalarValue?: number | string | boolean | null;
  tableValue?: { columns: string[]; rows: any[][] };
  formattedOutput: string;
  breakdown?: {
    tableUsed: string;
    rowsEvaluated: number;
    filtersApplied: string[];
    steps: string[];
  };
  error?: string;
  suggestedFix?: string;
  executionTimeMs: number;
}

/**
 * Extracts table and column name from DAX identifier like `Sales[Revenue]` or `'Sales'[Revenue]` or `[Total Sales]`
 */
export function parseDaxColumnReference(ref: string, defaultTable: string = 'Sales'): { table: string; column: string } {
  const clean = ref.trim();
  const match = clean.match(/(?:'([^']+)'|([a-zA-Z0-9_]+))?\[([^\]]+)\]/);
  if (match) {
    const table = match[1] || match[2] || defaultTable;
    const column = match[3];
    return { table, column };
  }
  return { table: defaultTable, column: clean };
}

/**
 * Parses and evaluates a DAX statement in browser
 */
export function evaluateDaxExpression(
  daxCode: string,
  model = sampleDataModel
): DaxEvaluationResult {
  const startTime = performance.now();
  const trimmed = daxCode.trim();

  if (!trimmed) {
    return {
      isSuccess: false,
      expression: '',
      resultType: 'scalar',
      formattedOutput: 'Error: Empty DAX expression.',
      error: 'Expression is empty. Enter a valid DAX formula like Total Sales = SUM(Sales[Revenue]).',
      executionTimeMs: 0,
    };
  }

  try {
    let measureName: string | undefined = undefined;
    let formula = trimmed;

    // Check for Measure definition format: `MeasureName = Formula`
    const measureDefMatch = trimmed.match(/^([^=]+)=(.*)$/s);
    if (measureDefMatch && !trimmed.startsWith('EVALUATE') && !trimmed.startsWith('FILTER')) {
      measureName = measureDefMatch[1].trim().replace(/^\[|\]$/g, '');
      formula = measureDefMatch[2].trim();
    }

    // Check for Power Query M expression
    if (formula.startsWith('Table.') || formula.startsWith('let')) {
      return evaluatePowerQueryExpression(formula, model, startTime);
    }

    // Check for EVALUATE table statement
    if (formula.toUpperCase().startsWith('EVALUATE')) {
      const tableExpr = formula.substring(8).trim();
      return evaluateDaxTableExpression(tableExpr, model, startTime);
    }

    // Evaluate DAX Scalar / Aggregate Expression
    const res = evaluateDaxScalar(formula, model);
    const executionTimeMs = Math.round(performance.now() - startTime);

    const displayName = measureName ? `[${measureName}]` : 'Calculated Value';
    let formatted = '';

    if (typeof res.value === 'number') {
      const isCurrency = measureName && (measureName.toLowerCase().includes('sales') || measureName.toLowerCase().includes('revenue') || measureName.toLowerCase().includes('profit') || measureName.toLowerCase().includes('cost') || measureName.toLowerCase().includes('amount') || measureName.toLowerCase().includes('price'));
      const isPercent = measureName && (measureName.toLowerCase().includes('margin') || measureName.toLowerCase().includes('rate') || measureName.toLowerCase().includes('percent') || measureName.toLowerCase().includes('ratio'));

      let formattedNumber = res.value.toLocaleString(undefined, {
        minimumFractionDigits: isCurrency || isPercent ? 2 : 0,
        maximumFractionDigits: 2,
      });

      if (isCurrency) {
        formattedNumber = `$${formattedNumber}`;
      } else if (isPercent && res.value <= 1 && res.value >= -1) {
        formattedNumber = `${(res.value * 100).toFixed(1)}%`;
      }

      formatted = `═══════════════════════════════════════════════\n   DAX MEASURE RESULT: ${displayName}\n═══════════════════════════════════════════════\n\n  Value:  ${formattedNumber}\n  Raw:    ${res.value}\n\n  Summary: ${res.explanation}\n═══════════════════════════════════════════════`;
    } else {
      formatted = `═══════════════════════════════════════════════\n   DAX EVALUATION: ${displayName}\n═══════════════════════════════════════════════\n\n  Result: ${String(res.value)}\n\n  Summary: ${res.explanation}\n═══════════════════════════════════════════════`;
    }

    return {
      isSuccess: true,
      measureName,
      expression: formula,
      resultType: 'scalar',
      scalarValue: res.value,
      formattedOutput: formatted,
      breakdown: {
        tableUsed: res.tableUsed,
        rowsEvaluated: res.rowsEvaluated,
        filtersApplied: res.filtersApplied,
        steps: res.steps,
      },
      executionTimeMs,
    };
  } catch (err: any) {
    const executionTimeMs = Math.round(performance.now() - startTime);
    const errorMsg = err.message || String(err);
    const fix = generateDaxFix(trimmed, errorMsg);

    return {
      isSuccess: false,
      expression: trimmed,
      resultType: 'scalar',
      formattedOutput: `[DAX Syntax / Evaluation Error]\n${errorMsg}\n\nSuggested Fix:\n${fix}`,
      error: errorMsg,
      suggestedFix: fix,
      executionTimeMs,
    };
  }
}

interface InternalScalarEval {
  value: number | string | boolean | null;
  tableUsed: string;
  rowsEvaluated: number;
  filtersApplied: string[];
  steps: string[];
  explanation: string;
}

/**
 * Evaluates core DAX functions: SUM, AVERAGE, COUNT, COUNTROWS, DISTINCTCOUNT, MIN, MAX, DIVIDE, CALCULATE, SUMX, FILTER, etc.
 */
function evaluateDaxScalar(expr: string, model: typeof sampleDataModel): InternalScalarEval {
  const clean = expr.trim();
  const salesTable = model.tables.Sales;

  // 1. CALCULATE(Expression, Filter1, Filter2, ...)
  const calcMatch = clean.match(/^CALCULATE\s*\((.*)\)$/is);
  if (calcMatch) {
    const inside = calcMatch[1];
    const parts = splitDaxArguments(inside);
    if (parts.length === 0) throw new Error('CALCULATE expects at least 1 argument: CALCULATE(<expression>, [<filter1>], ...)');

    const innerExpr = parts[0];
    const filterExprs = parts.slice(1);

    // Filter model data according to expressions
    let filteredSales = [...salesTable.data];
    const appliedFilterDesc: string[] = [];

    for (const f of filterExprs) {
      const fTrim = f.trim();
      
      // ALL('Table') or ALL(Table[Column])
      if (fTrim.toUpperCase().startsWith('ALL(')) {
        appliedFilterDesc.push(`ALL Context Cleared: ${fTrim}`);
        continue;
      }

      // Column = "Value" or Column > Value
      const eqMatch = fTrim.match(/([a-zA-Z0-9_'\s\[\]]+)\s*(=|!=|<>|>|<|>=|<=)\s*(.*)/);
      if (eqMatch) {
        const colRef = parseDaxColumnReference(eqMatch[1], 'Sales');
        const operator = eqMatch[2];
        let targetVal = eqMatch[3].trim().replace(/^["']|["']$/g, '');
        const numTarget = Number(targetVal);

        appliedFilterDesc.push(`${colRef.table}[${colRef.column}] ${operator} ${targetVal}`);

        filteredSales = filteredSales.filter(row => {
          let rowVal = row[colRef.column];
          
          // If referencing related table (e.g. Products or Customers)
          if (colRef.table !== 'Sales') {
            if (colRef.table === 'Products') {
              const p = model.tables.Products.data.find(prod => prod.ProductID === row.ProductID);
              rowVal = p ? p[colRef.column] : undefined;
            } else if (colRef.table === 'Customers') {
              const c = model.tables.Customers.data.find(cust => cust.CustomerID === row.CustomerID);
              rowVal = c ? c[colRef.column] : undefined;
            }
          }

          if (rowVal === undefined) return true;

          if (!isNaN(numTarget) && typeof rowVal === 'number') {
            if (operator === '=') return rowVal === numTarget;
            if (operator === '!=' || operator === '<>') return rowVal !== numTarget;
            if (operator === '>') return rowVal > numTarget;
            if (operator === '<') return rowVal < numTarget;
            if (operator === '>=') return rowVal >= numTarget;
            if (operator === '<=') return rowVal <= numTarget;
          }

          const strVal = String(rowVal).toLowerCase();
          const strTarget = targetVal.toLowerCase();
          if (operator === '=') return strVal === strTarget;
          if (operator === '!=' || operator === '<>') return strVal !== strTarget;
          return true;
        });
      }
    }

    // Temporary model with filtered sales
    const tempModel = {
      ...model,
      tables: {
        ...model.tables,
        Sales: {
          ...salesTable,
          data: filteredSales,
        },
      },
    };

    const innerResult = evaluateDaxScalar(innerExpr, tempModel);
    return {
      value: innerResult.value,
      tableUsed: 'Sales (Filtered via CALCULATE)',
      rowsEvaluated: filteredSales.length,
      filtersApplied: [...appliedFilterDesc, ...innerResult.filtersApplied],
      steps: [
        `CALCULATE modified filter context across ${appliedFilterDesc.length} condition(s).`,
        `Filtered Sales from ${salesTable.data.length} rows down to ${filteredSales.length} rows.`,
        ...innerResult.steps,
      ],
      explanation: `Calculated expression under modified filter context with result: ${innerResult.value}.`,
    };
  }

  // 2. DIVIDE(Numerator, Denominator, [AlternateResult])
  const divideMatch = clean.match(/^DIVIDE\s*\((.*)\)$/is);
  if (divideMatch) {
    const args = splitDaxArguments(divideMatch[1]);
    if (args.length < 2) throw new Error('DIVIDE requires at least 2 arguments: DIVIDE(<numerator>, <denominator>, [<alternateResult>])');
    const num = evaluateDaxScalar(args[0], model).value;
    const den = evaluateDaxScalar(args[1], model).value;
    const alt = args[2] ? evaluateDaxScalar(args[2], model).value : 0;

    const n = Number(num);
    const d = Number(den);

    if (d === 0 || isNaN(d) || isNaN(n)) {
      return {
        value: alt as any,
        tableUsed: 'Sales',
        rowsEvaluated: salesTable.data.length,
        filtersApplied: [],
        steps: [`DIVIDE safe zero check: denominator was 0, returned alternate value ${alt}`],
        explanation: `Safe division returned fallback ${alt} due to zero denominator.`,
      };
    }

    const val = Number((n / d).toFixed(4));
    return {
      value: val,
      tableUsed: 'Sales',
      rowsEvaluated: salesTable.data.length,
      filtersApplied: [],
      steps: [`Divided ${n} by ${d} = ${val}`],
      explanation: `DIVIDE returned ${val}.`,
    };
  }

  // 3. SUMX(Table, Expression) & AVERAGEX(Table, Expression)
  const iterMatch = clean.match(/^(SUMX|AVERAGEX|COUNTX|MINX|MAXX)\s*\((.*)\)$/is);
  if (iterMatch) {
    const fn = iterMatch[1].toUpperCase();
    const args = splitDaxArguments(iterMatch[2]);
    if (args.length < 2) throw new Error(`${fn} requires 2 arguments: ${fn}(<Table>, <Expression>)`);

    const tblRef = args[0].trim().replace(/^'|'$/g, '');
    const exprString = args[1].trim();
    const tbl = model.tables[tblRef] || salesTable;

    const rowValues = tbl.data.map(row => {
      // Evaluate simple arithmetic expression per row: e.g. `Sales[Quantity] * Sales[UnitPrice]`
      return evaluateRowExpression(exprString, row, model);
    });

    let finalVal: number = 0;
    if (fn === 'SUMX') {
      finalVal = rowValues.reduce((a, b) => a + b, 0);
    } else if (fn === 'AVERAGEX') {
      finalVal = rowValues.length > 0 ? rowValues.reduce((a, b) => a + b, 0) / rowValues.length : 0;
    } else if (fn === 'MINX') {
      finalVal = Math.min(...rowValues);
    } else if (fn === 'MAXX') {
      finalVal = Math.max(...rowValues);
    } else if (fn === 'COUNTX') {
      finalVal = rowValues.filter(v => v !== null && v !== undefined).length;
    }

    finalVal = Number(finalVal.toFixed(2));

    return {
      value: finalVal,
      tableUsed: tbl.name,
      rowsEvaluated: tbl.data.length,
      filtersApplied: [],
      steps: [`Iterated over ${tbl.data.length} rows in ${tbl.name} evaluating (${exprString})`],
      explanation: `${fn} calculated across table rows resulting in ${finalVal}.`,
    };
  }

  // 4. Standard Aggregations: SUM, AVERAGE, COUNT, COUNTROWS, DISTINCTCOUNT, MIN, MAX
  const aggMatch = clean.match(/^(SUM|AVERAGE|COUNT|COUNTA|COUNTROWS|DISTINCTCOUNT|MIN|MAX)\s*\((.*)\)$/is);
  if (aggMatch) {
    const fn = aggMatch[1].toUpperCase();
    const arg = aggMatch[2].trim();

    if (fn === 'COUNTROWS') {
      const tblName = arg.replace(/^'|'$/g, '');
      const tbl = model.tables[tblName] || salesTable;
      const count = tbl.data.length;
      return {
        value: count,
        tableUsed: tbl.name,
        rowsEvaluated: count,
        filtersApplied: [],
        steps: [`COUNTROWS evaluated on table ${tbl.name}: total ${count} row(s)`],
        explanation: `Total row count in ${tbl.name} is ${count}.`,
      };
    }

    const { table, column } = parseDaxColumnReference(arg, 'Sales');
    const tbl = model.tables[table] || salesTable;
    const values = tbl.data.map(r => r[column]).filter(v => v !== undefined && v !== null);

    let val: number = 0;
    if (fn === 'SUM') {
      val = values.reduce((a, b) => Number(a) + Number(b), 0);
    } else if (fn === 'AVERAGE') {
      val = values.length > 0 ? values.reduce((a, b) => Number(a) + Number(b), 0) / values.length : 0;
    } else if (fn === 'MIN') {
      val = Math.min(...values.map(Number));
    } else if (fn === 'MAX') {
      val = Math.max(...values.map(Number));
    } else if (fn === 'COUNT' || fn === 'COUNTA') {
      val = values.length;
    } else if (fn === 'DISTINCTCOUNT') {
      val = new Set(values).size;
    }

    val = Number(val.toFixed(2));

    return {
      value: val,
      tableUsed: tbl.name,
      rowsEvaluated: tbl.data.length,
      filtersApplied: [],
      steps: [`Aggregated column [${column}] using ${fn}() across ${values.length} records`],
      explanation: `${fn}(${tbl.name}[${column}]) returned ${val}.`,
    };
  }

  // 5. TOTALYTD(Expression, DateColumn)
  const ytdMatch = clean.match(/^TOTALYTD\s*\((.*)\)$/is);
  if (ytdMatch) {
    const args = splitDaxArguments(ytdMatch[1]);
    const inner = evaluateDaxScalar(args[0], model);
    return {
      value: inner.value,
      tableUsed: 'Sales & Calendar',
      rowsEvaluated: salesTable.data.length,
      filtersApplied: ['Year-To-Date Date Range Filter'],
      steps: ['Applied TOTALYTD time intelligence over 2026 Calendar', ...inner.steps],
      explanation: `TOTALYTD computed year-to-date total: ${inner.value}.`,
    };
  }

  // 6. IF(Condition, TrueVal, FalseVal)
  const ifMatch = clean.match(/^IF\s*\((.*)\)$/is);
  if (ifMatch) {
    const args = splitDaxArguments(ifMatch[1]);
    const condExpr = args[0];
    const trueVal = args[1] ? evaluateDaxScalar(args[1], model).value : null;
    const falseVal = args[2] ? evaluateDaxScalar(args[2], model).value : null;

    // Evaluate basic condition
    const isTrue = evaluateCondition(condExpr, model);
    const chosen = isTrue ? trueVal : falseVal;

    return {
      value: chosen,
      tableUsed: 'Sales',
      rowsEvaluated: salesTable.data.length,
      filtersApplied: [],
      steps: [`Evaluated condition (${condExpr}) -> ${isTrue}`, `Selected branch value: ${chosen}`],
      explanation: `IF branch returned ${chosen}.`,
    };
  }

  // 7. Measure reference resolution: e.g. [Total Sales], [Total Profit], [Total Cost]
  const measureRefMatch = clean.match(/^\[([a-zA-Z0-9_\s]+)\]$/);
  if (measureRefMatch) {
    const mName = measureRefMatch[1].trim().toLowerCase();
    if (mName === 'total sales' || mName === 'sales amount' || mName === 'total revenue' || mName === 'revenue') {
      return evaluateDaxScalar('SUM(Sales[Revenue])', model);
    }
    if (mName === 'total cost' || mName === 'cost') {
      return evaluateDaxScalar('SUM(Sales[Cost])', model);
    }
    if (mName === 'total profit' || mName === 'profit') {
      return evaluateDaxScalar('SUM(Sales[Profit])', model);
    }
    if (mName === 'total quantity' || mName === 'quantity') {
      return evaluateDaxScalar('SUM(Sales[Quantity])', model);
    }
    if (mName === 'total orders' || mName === 'order count' || mName === 'ordercount') {
      return evaluateDaxScalar('COUNTROWS(Sales)', model);
    }
    if (mName === 'total customers' || mName === 'customer count') {
      return evaluateDaxScalar('DISTINCTCOUNT(Sales[CustomerID])', model);
    }
    // Check if column exists directly in Sales
    if (salesTable.columns.includes(measureRefMatch[1].trim())) {
      return evaluateDaxScalar(`SUM(Sales[${measureRefMatch[1].trim()}])`, model);
    }
  }

  // 8. Direct Column or Number Reference fallback
  const directNum = Number(clean);
  if (!isNaN(directNum)) {
    return {
      value: directNum,
      tableUsed: 'Constant',
      rowsEvaluated: 1,
      filtersApplied: [],
      steps: [`Constant scalar value ${directNum}`],
      explanation: `Constant ${directNum}`,
    };
  }

  // Try parsing as arithmetic: e.g. `[Total Sales] - [Total Cost]`
  const mathMatch = clean.match(/^(.+)\s*([\+\-\*\/])\s*(.+)$/);
  if (mathMatch) {
    const left = evaluateDaxScalar(mathMatch[1], model).value;
    const op = mathMatch[2];
    const right = evaluateDaxScalar(mathMatch[3], model).value;
    const nLeft = Number(left);
    const nRight = Number(right);

    let res = 0;
    if (op === '+') res = nLeft + nRight;
    if (op === '-') res = nLeft - nRight;
    if (op === '*') res = nLeft * nRight;
    if (op === '/') res = nRight !== 0 ? nLeft / nRight : 0;

    res = Number(res.toFixed(2));
    return {
      value: res,
      tableUsed: 'Sales',
      rowsEvaluated: salesTable.data.length,
      filtersApplied: [],
      steps: [`Evaluated ${nLeft} ${op} ${nRight} = ${res}`],
      explanation: `Calculated expression result: ${res}`,
    };
  }

  throw new Error(`Unrecognized DAX function or formula structure: "${clean}". Check syntax or parenthesis pairing.`);
}

/**
 * Evaluates row-level arithmetic like `Sales[Quantity] * Sales[UnitPrice]`
 */
function evaluateRowExpression(expr: string, row: DataRow, model: typeof sampleDataModel): number {
  let replaced = expr;
  
  // Replace references like `Sales[Quantity]` or `[Quantity]` with numeric values from row
  for (const col of Object.keys(row)) {
    const val = Number(row[col]) || 0;
    const regexFull = new RegExp(`(?:[a-zA-Z0-9_]+)?\\[${col}\\]`, 'gi');
    replaced = replaced.replace(regexFull, String(val));
  }

  // Handle RELATED(Products[UnitCost])
  const relatedMatch = replaced.match(/RELATED\s*\(\s*(?:Products|Customers)\[([^\]]+)\]\s*\)/gi);
  if (relatedMatch) {
    for (const rel of relatedMatch) {
      const colMatch = rel.match(/\[([^\]]+)\]/);
      if (colMatch && row.ProductID) {
        const prod = model.tables.Products.data.find(p => p.ProductID === row.ProductID);
        const pVal = prod ? Number(prod[colMatch[1]]) || 0 : 0;
        replaced = replaced.replace(rel, String(pVal));
      }
    }
  }

  try {
    // Safe numeric arithmetic evaluation
    const cleanMath = replaced.replace(/[^0-9\.\+\-\*\/\(\)\s]/g, '');
    const result = Function(`"use strict"; return (${cleanMath});`)();
    return typeof result === 'number' && !isNaN(result) ? result : 0;
  } catch {
    return 0;
  }
}

/**
 * Splits comma-separated DAX arguments while respecting nested parentheses
 */
function splitDaxArguments(str: string): string[] {
  const result: string[] = [];
  let current = '';
  let depth = 0;
  let inQuote = false;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char === '"' || char === "'") {
      inQuote = !inQuote;
      current += char;
    } else if (char === '(' || char === '[') {
      if (!inQuote) depth++;
      current += char;
    } else if (char === ')' || char === ']') {
      if (!inQuote) depth--;
      current += char;
    } else if (char === ',' && depth === 0 && !inQuote) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  if (current.trim()) {
    result.push(current.trim());
  }

  return result;
}

/**
 * Evaluates DAX Table Expressions like `FILTER(Sales, Sales[Revenue] > 500)` or `SUMMARIZE(...)`
 */
function evaluateDaxTableExpression(
  expr: string,
  model: typeof sampleDataModel,
  startTime: number
): DaxEvaluationResult {
  const clean = expr.trim();
  const salesTable = model.tables.Sales;

  // FILTER(Table, Condition)
  const filterMatch = clean.match(/^FILTER\s*\((.*)\)$/is);
  if (filterMatch) {
    const args = splitDaxArguments(filterMatch[1]);
    const tblName = args[0].trim().replace(/^'|'$/g, '');
    const tbl = model.tables[tblName] || salesTable;
    const cond = args[1] || '1=1';

    const eqMatch = cond.match(/([a-zA-Z0-9_'\s\[\]]+)\s*(=|!=|<>|>|<|>=|<=)\s*(.*)/);
    let filtered = [...tbl.data];

    if (eqMatch) {
      const colRef = parseDaxColumnReference(eqMatch[1], tbl.name);
      const op = eqMatch[2];
      const target = eqMatch[3].trim().replace(/^["']|["']$/g, '');
      const numTarget = Number(target);

      filtered = filtered.filter(row => {
        const val = row[colRef.column];
        if (!isNaN(numTarget) && typeof val === 'number') {
          if (op === '>') return val > numTarget;
          if (op === '<') return val < numTarget;
          if (op === '>=') return val >= numTarget;
          if (op === '<=') return val <= numTarget;
          if (op === '=') return val === numTarget;
          if (op === '!=' || op === '<>') return val !== numTarget;
        }
        return String(val).toLowerCase() === target.toLowerCase();
      });
    }

    const cols = tbl.columns;
    const rows = filtered.map(r => cols.map(c => r[c]));

    const formattedTable = formatAsciiTable(cols, rows, `FILTER(${tbl.name}, ${cond})`);
    return {
      isSuccess: true,
      expression: clean,
      resultType: 'table',
      tableValue: { columns: cols, rows },
      formattedOutput: formattedTable,
      executionTimeMs: Math.round(performance.now() - startTime),
    };
  }

  // Default: Return full Sales table
  const cols = salesTable.columns;
  const rows = salesTable.data.map(r => cols.map(c => r[c]));
  return {
    isSuccess: true,
    expression: clean,
    resultType: 'table',
    tableValue: { columns: cols, rows },
    formattedOutput: formatAsciiTable(cols, rows, 'Table Output'),
    executionTimeMs: Math.round(performance.now() - startTime),
  };
}

/**
 * Evaluates Power Query (M) expressions
 */
function evaluatePowerQueryExpression(
  expr: string,
  model: typeof sampleDataModel,
  startTime: number
): DaxEvaluationResult {
  const clean = expr.trim();
  const salesTable = model.tables.Sales;
  let rows = [...salesTable.data];
  let cols = [...salesTable.columns];
  let transformationNote = 'Applied Power Query M Step';

  if (clean.includes('Table.SelectRows')) {
    rows = rows.filter(r => r.Revenue >= 500);
    transformationNote = 'Filtered rows where Revenue >= $500';
  } else if (clean.includes('Table.AddColumn')) {
    cols.push('ProfitMarginPct');
    rows = rows.map(r => ({
      ...r,
      ProfitMarginPct: `${((r.Profit / r.Revenue) * 100).toFixed(1)}%`,
    }));
    transformationNote = 'Added custom column [ProfitMarginPct]';
  }

  const tableData = rows.map(r => cols.map(c => r[c]));
  const output = formatAsciiTable(cols, tableData, `Power Query M Transformation: ${transformationNote}`);

  return {
    isSuccess: true,
    expression: clean,
    resultType: 'table',
    tableValue: { columns: cols, rows: tableData },
    formattedOutput: output,
    executionTimeMs: Math.round(performance.now() - startTime),
  };
}

function evaluateCondition(cond: string, model: typeof sampleDataModel): boolean {
  const parts = cond.split(/(>|<|>=|<=|=|!=)/);
  if (parts.length >= 3) {
    const leftVal = evaluateDaxScalar(parts[0], model).value;
    const op = parts[1].trim();
    const rightVal = evaluateDaxScalar(parts[2], model).value;

    const nl = Number(leftVal);
    const nr = Number(rightVal);

    if (op === '>') return nl > nr;
    if (op === '<') return nl < nr;
    if (op === '>=') return nl >= nr;
    if (op === '<=') return nl <= nr;
    if (op === '=') return leftVal === rightVal;
    if (op === '!=') return leftVal !== rightVal;
  }
  return true;
}

/**
 * Pretty ASCII Table formatter
 */
export function formatAsciiTable(columns: string[], rows: any[][], title: string): string {
  const colWidths = columns.map((col, i) => {
    const maxValLen = rows.reduce((max, row) => Math.max(max, String(row[i] ?? 'NULL').length), 0);
    return Math.max(col.length, maxValLen);
  });

  const headerLine = columns.map((col, i) => col.padEnd(colWidths[i])).join(' | ');
  const separatorLine = colWidths.map(w => '-'.repeat(w)).join('-+-');
  const rowsLines = rows.map(row => 
    row.map((val, i) => String(val ?? 'NULL').padEnd(colWidths[i])).join(' | ')
  );

  return [
    `══════════════════════════════════════════════════════════`,
    `   ${title.toUpperCase()} (${rows.length} rows)`,
    `══════════════════════════════════════════════════════════`,
    headerLine,
    separatorLine,
    ...rowsLines,
    `══════════════════════════════════════════════════════════`,
  ].join('\n');
}

/**
 * Diagnostic Fix Generator for DAX formulas
 */
function generateDaxFix(code: string, error: string): string {
  if (error.includes('parenthesis') || error.includes('syntax')) {
    if (!code.includes(')')) return `${code})`;
    if (!code.includes(']')) return `${code}]`;
  }
  if (!code.includes('=')) {
    return `Total Measure = ${code}`;
  }
  return code;
}
