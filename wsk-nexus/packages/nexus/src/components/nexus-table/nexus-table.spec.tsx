import { NexusTable } from './nexus-table';
import { newE2EPage, newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';

const columnDefs = [
  {
    field: 'make',
    label: 'Automobile Make',
    isSortable: true,
    sortAscending: (firstValue, secondValue, sortField) => (firstValue[sortField] > secondValue[sortField] ? 1 : -1)
  },
  {
    field: 'model',
    label: 'Automobile Model'
  },
  {
    field: 'price',
    label: 'Automobile Sale Price',
    isSortable: false,
    cellRenderer: (value) => `<i style="color: ${value < 35000 ? 'red' : 'green'}">
    ${
      value < 35000 ? '<nexus-icon size="xs" src="./assets/icons/alert/ic_warning_24px.svg"></nexus-icon>' : ''
    } ${value} </i>`,
    headerClass: 'text-right',
    cellClass: 'text-right'
  }
];

const columnDefaultSort = [
  {
    field: 'make',
    label: 'Automobile Make',
    isSortable: true
  },
  {
    field: 'model',
    label: 'Automobile Model',
    isSortable: true
  },
  {
    field: 'price',
    label: 'Automobile Sale Price',
    isSortable: false,
    cellRenderer: (value) => `<i style="color: ${value < 35000 ? 'red' : 'green'}">
    ${
      value < 35000 ? '<nexus-icon size="xs" src="./assets/icons/alert/ic_warning_24px.svg"></nexus-icon>' : ''
    } ${value} </i>`,
    headerClass: 'text-right',
    cellClass: 'text-right'
  }
];

const rows = [
  {
    model: 'Celica',
    make: 'Toyota',
    price: 35000
  },
  {
    make: 'Ford',
    model: 'Mondeo',
    price: 32000
  },
  {
    make: 'Porsche',
    model: 'Boxster',
    price: 72000
  },
  {
    model: 'Celica',
    make: 'Toyota',
    price: 25000
  },
  {
    make: 'Ford',
    model: 'Mondeo',
    price: 15000
  },
  {
    make: 'Porsche',
    model: 'Boxster',
    price: 10000
  }
];

// TODO: ESLINT only accepts only arrow functions

// eslint-disable-next-line func-style
function sortAscFunction(firstValue, secondValue, sortField) {
  return firstValue[sortField] > secondValue[sortField] ? 1 : -1;
}

// eslint-disable-next-line func-style
function cellRendererFun(value) {
  return `<div class="custom-cell-renderer-value">${value}<div>`;
}

describe('nexus-table', () => {
  it('should contain class', async () => {
    const page = await newSpecPage({
      components: [NexusTable],
      template: () => <nexus-table></nexus-table>
    });

    const table = page.body.querySelector('table');
    expect(table).toHaveClass('nexus-table');
  });

  it('should contain table headers', async () => {
    const page = await newSpecPage({
      components: [NexusTable],
      template: () => (
        <nexus-table rows={rows} columns={columnDefs}>
          {' '}
        </nexus-table>
      )
    });
    const tableHead = page.body.querySelector('thead');
    const columns = tableHead.querySelectorAll('th');

    expect(columns.length).toEqual(columns?.length);
  });

  it('should contain table rows', async () => {
    const page = await newSpecPage({
      components: [NexusTable],
      template: () => (
        <nexus-table rows={rows} columns={columnDefs}>
          {' '}
        </nexus-table>
      )
    });

    const tableHead = page.body.querySelector('tbody');
    const rowdata = tableHead.querySelectorAll('tr');

    expect(rowdata.length).toEqual(rows?.length);
  });

  it('should not contain pagination', async () => {
    const page = await newSpecPage({
      components: [NexusTable],
      template: () => (
        <nexus-table rows={rows} columns={columnDefs}>
          {' '}
        </nexus-table>
      )
    });

    const pagination = page.body.querySelectorAll('nexus-pagination');

    expect(pagination.length).toEqual(0);
  });

  it('should contain pagination', async () => {
    const page = await newSpecPage({
      components: [NexusTable],
      template: () => (
        <nexus-table rows={rows} columns={columnDefs} pagination={true}>
          {' '}
        </nexus-table>
      )
    });

    const pagination = page.body.querySelectorAll('tfoot');

    expect(pagination.length).toEqual(1);
  });

  it('should not allow multiple row selection', async () => {
    const page = await newSpecPage({
      components: [NexusTable],
      template: () => (
        <nexus-table rows={rows} columns={columnDefs} pagination={true}>
          {' '}
        </nexus-table>
      )
    });

    const table = page.body.querySelector('table');
    const multiSelectRow = table.querySelectorAll('.nexus-multi-select-col');

    expect(multiSelectRow.length).toEqual(0);
  });

  it('should allow multiple row selection', async () => {
    const page = await newSpecPage({
      components: [NexusTable],
      template: () => (
        <nexus-table rows={rows} columns={columnDefs} pagination={true} rowSelection={true}>
          {' '}
        </nexus-table>
      )
    });

    const tableHead = page.body.querySelector('thead');
    const multiSelectRowHeader = tableHead.querySelectorAll('.nexus-multi-select-col');
    const tableBody = page.body.querySelector('tbody');
    const multiSelectRowBody = tableBody.querySelectorAll('.nexus-multi-select-col');

    expect(multiSelectRowHeader.length).toEqual(1);
    expect(multiSelectRowBody.length).toEqual(rows?.length);
  });

  it('should sort column - ascending', async () => {
    const page = await newSpecPage({
      components: [NexusTable],
      template: () => (
        <nexus-table rows={rows} columns={columnDefs} pagination={true} rowSelection={true}>
          {' '}
        </nexus-table>
      )
    });

    const nexusTable = page.rootInstance;
    const tableHead = page.body.querySelector('thead');
    const sortableColumn = columnDefs.find((col) => col?.isSortable);
    const column = tableHead.querySelector(`#${sortableColumn?.field}`);
    const nexusIcon = column.getElementsByTagName('nexus-icon');

    const event = new Event('click', {
      bubbles: true
    });
    jest.spyOn(nexusTable, 'sortHandler');
    await page.waitForChanges();
    nexusIcon[0].dispatchEvent(event);
    await page.waitForChanges();
    expect(nexusTable.sortHandler).toHaveBeenCalled();
  });

  it('should sort column - descending', async () => {
    const page = await newSpecPage({
      components: [NexusTable],
      template: () => (
        <nexus-table rows={rows} columns={columnDefs} pagination={true} rowSelection={true}>
          {' '}
        </nexus-table>
      )
    });

    const nexusTable = page.rootInstance;
    const tableHead = page.body.querySelector('thead');
    const sortableColumn = columnDefs.find((col) => col?.isSortable);
    const column = tableHead.querySelector(`#${sortableColumn?.field}`);
    const nexusIcon = column.getElementsByTagName('nexus-icon');

    const event = new Event('click', {
      bubbles: true
    });
    jest.spyOn(nexusTable, 'sortHandler');
    // Ascending Order
    await page.waitForChanges();
    nexusIcon[0].dispatchEvent(event);
    await page.waitForChanges();
    expect(nexusTable.sortHandler).toHaveBeenCalled();
    // Descending Order
    await page.waitForChanges();
    nexusIcon[0].dispatchEvent(event);
    await page.waitForChanges();
    expect(nexusTable.sortHandler).toHaveBeenCalled();
  });

  it('should reset column - neutral', async () => {
    const page = await newSpecPage({
      components: [NexusTable],
      template: () => (
        <nexus-table rows={rows} columns={columnDefs} pagination={true} rowSelection={true}>
          {' '}
        </nexus-table>
      )
    });

    const nexusTable = page.rootInstance;
    const tableHead = page.body.querySelector('thead');
    const sortableColumn = columnDefs.find((col) => col?.isSortable);
    const column = tableHead.querySelector(`#${sortableColumn?.field}`);
    const nexusIcon = column.getElementsByTagName('nexus-icon');

    const event = new Event('click', {
      bubbles: true
    });
    jest.spyOn(nexusTable, 'sortHandler');
    // Ascending Order
    await page.waitForChanges();
    nexusIcon[0].dispatchEvent(event);
    await page.waitForChanges();
    expect(nexusTable.sortHandler).toHaveBeenCalled();
    // Descending Order
    await page.waitForChanges();
    nexusIcon[0].dispatchEvent(event);
    await page.waitForChanges();
    expect(nexusTable.sortHandler).toHaveBeenCalled();
    // Neutral Order
    await page.waitForChanges();
    nexusIcon[0].dispatchEvent(event);
    await page.waitForChanges();
    expect(nexusTable.sortHandler).toHaveBeenCalled();
  });

  it('should select all rows when multiple page', async () => {
    const page = await newSpecPage({
      components: [NexusTable],
      template: () => (
        <nexus-table
          rows={rows}
          columns={columnDefs}
          pagination={true}
          rowSelection={true}
          pageSizeOpt={[5, 10, 20]}
          pageSize={5}
        >
          {' '}
        </nexus-table>
      )
    });

    const tableHead = page.body.querySelector('thead');
    const nexusCheckbox = tableHead.getElementsByTagName('nexus-checkbox');

    expect(nexusCheckbox[0].checked).toBeFalsy();
    const changeEvent = new Event('input');

    nexusCheckbox[0].checked = true;
    nexusCheckbox[0].dispatchEvent(changeEvent);
    await page.waitForChanges();

    expect(nexusCheckbox[0].checked).toBeTruthy();
  });

  it('should select all rows when single page', async () => {
    const page = await newSpecPage({
      components: [NexusTable],
      template: () => (
        <nexus-table
          rows={rows.slice(0, 3)}
          columns={columnDefs}
          pagination={true}
          rowSelection={true}
          pageSizeOpt={[5, 10, 20]}
          pageSize={5}
        >
          {' '}
        </nexus-table>
      )
    });

    const tableHead = page.body.querySelector('thead');
    const nexusCheckbox = tableHead.getElementsByTagName('nexus-checkbox');

    expect(nexusCheckbox[0].checked).toBeFalsy();
    const changeEvent = new Event('input');

    nexusCheckbox[0].checked = true;
    nexusCheckbox[0].dispatchEvent(changeEvent);
    await page.waitForChanges();

    expect(nexusCheckbox[0].checked).toBeTruthy();
  });

  it('should select single row', async () => {
    const page = await newSpecPage({
      components: [NexusTable],
      template: () => (
        <nexus-table rows={rows} columns={columnDefs} pagination={true} rowSelection={true}>
          {' '}
        </nexus-table>
      )
    });

    const tableBody = page.body.querySelector('tbody');
    const nexusCheckbox = tableBody.getElementsByTagName('nexus-checkbox');

    expect(nexusCheckbox[0].checked).toBeFalsy();
    const changeEvent = new Event('input');

    nexusCheckbox[0].checked = true;
    nexusCheckbox[0].dispatchEvent(changeEvent);
    await page.waitForChanges();

    expect(nexusCheckbox[0].checked).toBeTruthy();
  });

  it('should unselect single row', async () => {
    const page = await newSpecPage({
      components: [NexusTable],
      template: () => (
        <nexus-table rows={rows} columns={columnDefs} pagination={true} rowSelection={true}>
          {' '}
        </nexus-table>
      )
    });

    const nexusTable = page.rootInstance;
    const tableBody = page.body.querySelector('tbody');
    const nexusCheckbox = tableBody.getElementsByTagName('nexus-checkbox');
    jest.spyOn(nexusTable, 'rowSelectHandler');
    expect(nexusCheckbox[0].checked).toBeFalsy();
    const changeEvent = new Event('input');

    nexusCheckbox[0].checked = false;
    nexusCheckbox[0].dispatchEvent(changeEvent);
    await page.waitForChanges();

    expect(nexusCheckbox[0].checked).toBeFalsy();
    expect(nexusTable.rowSelectHandler).toHaveBeenCalled();
  });

  it('should not contain element for page size label', async () => {
    const page = await newSpecPage({
      components: [NexusTable],
      template: () => <nexus-table rows={rows} columns={columnDefs} pagination={true} rowSelection={true}></nexus-table>
    });

    const pagination = page.body.querySelector('tfoot');
    const pageSizeLabel = pagination.querySelectorAll('label');

    expect(pageSizeLabel.length).toEqual(0);
  });

  it('should contain class for page size label', async () => {
    const page = await newSpecPage({
      components: [NexusTable],
      template: () => (
        <nexus-table
          rows={rows}
          columns={columnDefs}
          pagination={true}
          rowSelection={true}
          pageSizeLabel={'Items per page'}
        ></nexus-table>
      )
    });

    const pagination = page.body.querySelector('tfoot');
    const pageSizeLabel = pagination.querySelectorAll('label');

    expect(pageSizeLabel.length).toEqual(1);
  });

  it('should call rowSelect.emit function', async () => {
    const page = await newSpecPage({
      components: [NexusTable],
      template: () => (
        <nexus-table
          rows={rows.slice(0, 3)}
          columns={columnDefs}
          pagination={true}
          rowSelection={true}
          pageSizeOpt={[5, 10, 20]}
          pageSize={5}
        >
          {' '}
        </nexus-table>
      )
    });

    const nexusTable = page.rootInstance;
    const tableHead = page.body.querySelector('thead');
    const nexusCheckbox = tableHead.getElementsByTagName('nexus-checkbox');
    jest.spyOn(nexusTable.rowSelect, 'emit');
    expect(nexusCheckbox[0].checked).toBeFalsy();
    const changeEvent = new Event('input');

    nexusCheckbox[0].checked = true;
    nexusCheckbox[0].dispatchEvent(changeEvent);
    await page.waitForChanges();

    expect(nexusCheckbox[0].checked).toBeTruthy();
    expect(nexusTable.rowSelect.emit).toHaveBeenCalled();
  });

  it('should sort column - ascending using custom sort function', async () => {
    const customColumnDefs = [...columnDefs];
    customColumnDefs[0].sortAscending = sortAscFunction;

    const page = await newSpecPage({
      components: [NexusTable],
      template: () => (
        <nexus-table rows={rows} columns={customColumnDefs} pagination={true} rowSelection={true}>
          {' '}
        </nexus-table>
      )
    });

    const nexusTable = page.rootInstance;
    const tableHead = page.body.querySelector('thead');
    const sortableColumn = customColumnDefs.find((col) => col?.isSortable);
    const column = tableHead.querySelector(`#${sortableColumn?.field}`);
    const nexusIcon = column.getElementsByTagName('nexus-icon');

    const event = new Event('click', {
      bubbles: true
    });
    jest.spyOn(nexusTable, 'sortHandler');
    await page.waitForChanges();
    nexusIcon[0].dispatchEvent(event);
    await page.waitForChanges();
    expect(nexusTable.sortHandler).toHaveBeenCalled();

    const tableBody = page.body.querySelector('tbody');
    const nexusCheckbox = tableBody.getElementsByTagName('nexus-checkbox');

    jest.spyOn(nexusTable.rowSelect, 'emit');
    expect(nexusCheckbox[0].checked).toBeFalsy();
    const changeEvent = new Event('input');

    nexusCheckbox[0].checked = true;
    nexusCheckbox[0].dispatchEvent(changeEvent);
    await page.waitForChanges();

    expect(nexusCheckbox[0].checked).toBeTruthy();
    expect(nexusTable.rowSelect.emit).toHaveBeenCalled();
  });

  it('should use custom cell renderer function', async () => {
    const customColumnDefs = [...columnDefs];
    customColumnDefs[0].cellRenderer = cellRendererFun;

    const page = await newSpecPage({
      components: [NexusTable],
      template: () => (
        <nexus-table rows={rows} columns={customColumnDefs}>
          {' '}
        </nexus-table>
      )
    });

    const customCellRendererClass = page.body.querySelectorAll('.custom-cell-renderer-value');
    expect(customCellRendererClass?.length).toEqual(rows.length);
  });

  it('should contain maxheight for scroll', async () => {
    const expectedHeight = '200';
    const expectedStyle = 'max-height: 200px;';
    const page = await newSpecPage({
      components: [NexusTable],
      template: () => (
        <nexus-table rows={rows} columns={columnDefs} pagination={true} maxHeight="200">
          {' '}
        </nexus-table>
      )
    });

    const table = page.body.querySelector('nexus-table');
    const tbody = page.body.querySelector('tbody');
    const style = tbody.getAttribute('style');
    expect(table.maxHeight).toBeTruthy();
    expect(table.maxHeight).toEqual(expectedHeight);
    expect(style).toEqual(expectedStyle);
  });

  it('should call onCurrentPageChangeHandler on pagination', async () => {
    const page = await newSpecPage({
      components: [NexusTable],
      template: () => (
        <nexus-table rows={rows} columns={columnDefs} pagination={true}>
          {' '}
        </nexus-table>
      )
    });

    const nexusTable = page.rootInstance;
    jest.spyOn(nexusTable, 'onCurrentPageChangeHandler');
    const pagination = page.body.querySelector('nexus-pagination');

    const event = new Event('changeEvent', {
      bubbles: true
    });
    pagination.dispatchEvent(event);
    await page.waitForChanges();
    expect(nexusTable.onCurrentPageChangeHandler).toHaveBeenCalled();
  });

  it('should sort column and call defaultSort function', async () => {
    const page = await newSpecPage({
      components: [NexusTable],
      template: () => (
        <nexus-table rows={rows} columns={columnDefaultSort} pagination={true} rowSelection={true}>
          {' '}
        </nexus-table>
      )
    });

    const nexusTable = page.rootInstance;
    const tableHead = page.body.querySelector('thead');
    const tableHeader = tableHead.querySelectorAll('th');
    const nexusIcon = tableHeader[1].querySelector('nexus-icon');

    const event = new Event('click', {
      bubbles: true
    });
    jest.spyOn(nexusTable, 'sortHandler');
    await page.waitForChanges();
    nexusIcon.dispatchEvent(event);
    await page.waitForChanges();
    expect(nexusTable.sortHandler).toHaveBeenCalled();
    await page.waitForChanges();
    nexusIcon.dispatchEvent(event);
    await page.waitForChanges();
    expect(nexusTable.sortHandler).toHaveBeenCalledTimes(2);
    await page.waitForChanges();
    nexusIcon.dispatchEvent(event);
    await page.waitForChanges();
    expect(nexusTable.sortHandler).toHaveBeenCalledTimes(3);
  });

  it('should emit tableChangeEvent on pagination', async () => {
    const page = await newSpecPage({
      components: [NexusTable],
      template: () => (
        <nexus-table rows={rows} columns={columnDefs} pagination={true}>
          {' '}
        </nexus-table>
      )
    });

    const nexusTable = page.rootInstance;
    jest.spyOn(nexusTable.tableChangeEvent, 'emit');
    const pagination = page.body.querySelector('nexus-pagination');

    const event = new Event('changeEvent', {
      bubbles: true
    });
    pagination.dispatchEvent(event);
    await page.waitForChanges();
    expect(nexusTable.tableChangeEvent.emit).toHaveBeenCalled();
  });

  it('should contain attrid when passed', async () => {
    const expectedAttrId = 'tableAttrId_table';
    const page = await newSpecPage({
      components: [NexusTable],
      template: () => (
        <nexus-table attrId={'tableAttrId'} rows={rows} columns={columnDefs} pagination={true}>
          {' '}
        </nexus-table>
      )
    });

    const table = page.body.querySelector('table');
    const id = table.getAttribute('id');
    expect(id).toEqual(expectedAttrId);
  });

  it('should calculate max pagination when totalItems is passed', async () => {
    const expectedTotalItems = 11;
    const expectedMaxPagination = '2';
    const page = await newSpecPage({
      components: [NexusTable],
      template: () => (
        <nexus-table
          type={'custom'}
          attrId={'tableAttrId'}
          totalItems={expectedTotalItems}
          columns={columnDefs}
          pagination={true}
        >
          {' '}
        </nexus-table>
      )
    });

    const pagination = page.body.querySelector('nexus-pagination');
    const max = pagination.getAttribute('max');
    expect(max).toEqual(expectedMaxPagination);
  });

  it('should contain nexus-table-custom class when type is custom', async () => {
    const page = await newSpecPage({
      components: [NexusTable],
      template: () => (
        <nexus-table attrId={'tableAttrId'} type={'custom'}>
          {' '}
        </nexus-table>
      )
    });

    const table = page.body.querySelector('table');
    expect(table).toHaveClass('nexus-table-custom');
  });

  it('should navigate to first page when negative value will be passed', async () => {
    const currentPage = -1;
    const expectedPage = '1';
    const page = await newSpecPage({
      components: [NexusTable],
      template: () => (
        <nexus-table
          type={'custom'}
          attrId={'tableAttrId'}
          currentPage={currentPage}
          columns={columnDefs}
          pagination={true}
        >
          {' '}
        </nexus-table>
      )
    });

    const pagination = page.body.querySelector('nexus-pagination');
    const current = pagination.getAttribute('current');
    expect(current).toEqual(expectedPage);
  });

  it('should navigate to the page you pass to currentPage', async () => {
    const currentPage = 1;
    const pageSize = 5;
    const expectedPage = '1';
    const page = await newSpecPage({
      components: [NexusTable],
      template: () => (
        <nexus-table
          attrId={'tableAttrId'}
          columns={columnDefs}
          currentPage={currentPage}
          pageSize={pageSize}
          pagination={true}
          rows={rows}
          type={'custom'}
        >
          {' '}
        </nexus-table>
      )
    });

    const pagination = page.body.querySelector('nexus-pagination');
    const current = pagination.getAttribute('current');
    expect(current).toEqual(expectedPage);
  });

  it('should select last page when current page exceeded the max value', async () => {
    const currentPage = 10;
    const pageSize = 5;
    const expectedPage = '2';
    const page = await newSpecPage({
      components: [NexusTable],
      template: () => (
        <nexus-table
          attrId={'tableAttrId'}
          columns={columnDefs}
          currentPage={currentPage}
          pageSize={pageSize}
          pagination={true}
          rows={rows}
          type={'custom'}
        >
          {' '}
        </nexus-table>
      )
    });

    const pagination = page.body.querySelector('nexus-pagination');
    const current = pagination.getAttribute('current');
    expect(current).toEqual(expectedPage);
  });

  it('should select last page when current page is set to exceeded the max value', async () => {
    const pageSize = 5;
    const expectedPage = '1';
    const page = await newSpecPage({
      components: [NexusTable],
      template: () => (
        <nexus-table
          type={'custom'}
          attrId={'tableAttrId'}
          rows={rows}
          columns={columnDefs}
          pageSize={pageSize}
          pagination={true}
        >
          {' '}
        </nexus-table>
      )
    });

    page.rootInstance.currentPage = 10;

    const pagination = page.body.querySelector('nexus-pagination');
    const current = pagination.getAttribute('current');
    expect(current).toEqual(expectedPage);
  });

  it('should change number of elements on page', async () => {
    const defaultPageSize = 10;
    const newPageSize = 25;

    const page = await newE2EPage();
    await page.setContent('<nexus-table></nexus-table>');

    const nexusTable = await page.find('nexus-table');

    nexusTable.setProperty('type', 'custom');
    nexusTable.setProperty('attrId', 'tableAttrId');
    nexusTable.setProperty('rows', rows);
    nexusTable.setProperty('columns', columnDefs);
    nexusTable.setProperty('pageSize', defaultPageSize);
    nexusTable.setProperty('pagination', true);

    await page.waitForChanges();

    const spy = await nexusTable.spyOnEvent('tableChangeEvent');

    const select = await nexusTable.find('nexus-select');
    select.triggerEvent('triggerSelection', { detail: { key: newPageSize } });

    await page.waitForChanges();

    expect(spy.events[0].detail.pageSize).toEqual(newPageSize);
  });

  it('should change number of elements on page to not listed one', async () => {
    const defaultPageSize = 10;
    const newPageSize = 13;

    const page = await newE2EPage();
    await page.setContent('<nexus-table></nexus-table>');

    const nexusTable = await page.find('nexus-table');

    nexusTable.setProperty('type', 'custom');
    nexusTable.setProperty('attrId', 'tableAttrId');
    nexusTable.setProperty('rows', rows);
    nexusTable.setProperty('columns', columnDefs);
    nexusTable.setProperty('pageSize', defaultPageSize);
    nexusTable.setProperty('pagination', true);

    await page.waitForChanges();

    const spy = await nexusTable.spyOnEvent('tableChangeEvent');

    const select = await nexusTable.find('nexus-select');
    select.triggerEvent('triggerSelection', { detail: { key: newPageSize } });

    await page.waitForChanges();

    expect(spy.events[0].detail.pageSize).toEqual(newPageSize);
  });

  it('should check all items on page', async () => {
    const defaultPageSize = 10;

    const page = await newE2EPage();
    await page.setContent('<nexus-table></nexus-table>');

    const nexusTable = await page.find('nexus-table');

    nexusTable.setProperty('type', 'custom');
    nexusTable.setProperty('attrId', 'tableAttrId');
    nexusTable.setProperty('rows', rows);
    nexusTable.setProperty('columns', columnDefs);
    nexusTable.setProperty('pageSize', defaultPageSize);
    nexusTable.setProperty('pagination', true);
    nexusTable.setProperty('rowSelection', true);

    await page.waitForChanges();

    const spy = await nexusTable.spyOnEvent('rowSelect');

    const checkbox = await nexusTable.find('nexus-checkbox');

    await checkbox.click();

    await page.waitForChanges();

    expect(spy).toHaveReceivedEventTimes(1);
  });

  it('should not render PageSize Select', async () => {
    const defaultPageSize = 10;

    const page = await newE2EPage();
    await page.setContent('<nexus-table></nexus-table>');

    const nexusTable = await page.find('nexus-table');

    nexusTable.setProperty('type', 'custom');
    nexusTable.setProperty('attrId', 'tableAttrId');
    nexusTable.setProperty('rows', rows);
    nexusTable.setProperty('columns', columnDefs);
    nexusTable.setProperty('pageSize', defaultPageSize);
    nexusTable.setProperty('pagination', true);
    nexusTable.setProperty('enablePageSizeOption', false);

    await page.waitForChanges();

    const select = await nexusTable.find('nexus-select');

    await page.waitForChanges();

    expect(select).toBeNull();
  });

  it('should render PageSize Select', async () => {
    const defaultPageSize = 10;

    const page = await newE2EPage();
    await page.setContent('<nexus-table></nexus-table>');

    const nexusTable = await page.find('nexus-table');

    nexusTable.setProperty('type', 'custom');
    nexusTable.setProperty('attrId', 'tableAttrId');
    nexusTable.setProperty('rows', rows);
    nexusTable.setProperty('columns', columnDefs);
    nexusTable.setProperty('pageSize', defaultPageSize);
    nexusTable.setProperty('pagination', true);
    nexusTable.setProperty('enablePageSizeOption', true);

    await page.waitForChanges();

    const select = await nexusTable.find('nexus-select');

    await page.waitForChanges();

    expect(select).toBeDefined();
  });

  it('should emit emitPageChangeEvent on pagination', async () => {
    const page = await newSpecPage({
      components: [NexusTable],
      template: () => (
        <nexus-table rows={rows} columns={columnDefs} pagination={true}>
          {' '}
        </nexus-table>
      )
    });

    const nexusTable = page.rootInstance;
    jest.spyOn(nexusTable.tableChangeEvent, 'emit');
    const select = page.body.querySelector('nexus-select');

    const event = new Event('triggerSelection', {
      bubbles: true
    });
    select.dispatchEvent(event);
    await page.waitForChanges();
    expect(nexusTable.tableChangeEvent.emit).toHaveBeenCalled();
  });

  it('should select fist page size if wrong PageSize is selected', async () => {
    const page = await newSpecPage({
      components: [NexusTable],
      template: () => (
        <nexus-table rows={rows} columns={columnDefs} pagination={true} pageSizeOpt={[5, 10, 20]} pageSize={3}>
          {' '}
        </nexus-table>
      )
    });

    const select = page.body.querySelector('nexus-select');

    select.getAttribute('value');

    expect(select.getAttribute('value')).toEqual('5');
  });

  it('should not be selected when sort was changed', async () => {
    const page = await newSpecPage({
      components: [NexusTable],
      template: () => (
        <nexus-table
          rows={rows}
          columns={columnDefs}
          pagination={true}
          rowSelection={true}
          pageSizeOpt={[5, 10, 20]}
          pageSize={5}
        >
          {' '}
        </nexus-table>
      )
    });

    const tableHead = page.body.querySelector('thead');
    const nexusCheckbox = tableHead.getElementsByTagName('nexus-checkbox');

    expect(nexusCheckbox[0].checked).toBeFalsy();
    const changeEvent = new Event('input');

    nexusCheckbox[0].checked = true;
    nexusCheckbox[0].dispatchEvent(changeEvent);
    await page.waitForChanges();

    const sortIcon = tableHead.getElementsByTagName('nexus-icon');
    const iconEvent = new Event('click');
    sortIcon[0].dispatchEvent(iconEvent);
    await page.waitForChanges();

    expect(nexusCheckbox[0].checked).toBeFalsy();
  });

  it('when rows is null', async () => {
    const page = await newSpecPage({
      components: [NexusTable],
      template: () => (
        <nexus-table
          rows={null}
          columns={columnDefs}
          pagination={true}
          rowSelection={true}
          pageSizeOpt={[5, 10, 20]}
          pageSize={5}
        >
          {' '}
        </nexus-table>
      )
    });
    const tableHead = page.body.querySelector('thead');
    const nexusCheckbox = tableHead.getElementsByTagName('nexus-checkbox');
    expect(nexusCheckbox[0].checked).toBeFalsy();

    const changeEvent = new Event('input');

    nexusCheckbox[0].checked = true;
    nexusCheckbox[0].dispatchEvent(changeEvent);
    await page.waitForChanges();

    const sortIcon = tableHead.getElementsByTagName('nexus-icon');
    const iconEvent = new Event('click');
    sortIcon[0].dispatchEvent(iconEvent);
    await page.waitForChanges();

    expect(nexusCheckbox[0].checked).toBeTruthy();
  });

  it('select all row when there is pagination of more than one page', async () => {
    const page = await newSpecPage({
      components: [NexusTable],
      template: () => (
        <nexus-table
          rows={rows.concat(...rows)}
          columns={columnDefs}
          pagination={true}
          rowSelection={true}
          pageSizeOpt={[2, 5, 10, 20]}
          pageSize={2}
        >
          {' '}
        </nexus-table>
      )
    });

    const tableHead = page.body.querySelector('thead');
    const nexusCheckbox = tableHead.getElementsByTagName('nexus-checkbox');
    expect(nexusCheckbox[0].checked).toBeFalsy();

    const changeEvent = new Event('input');

    nexusCheckbox[0].checked = true;
    nexusCheckbox[0].dispatchEvent(changeEvent);
    await page.waitForChanges();

    const sortIcon = tableHead.getElementsByTagName('nexus-icon');
    const iconEvent = new Event('click');
    sortIcon[0].dispatchEvent(iconEvent);
    await page.waitForChanges();

    const sortIcon1 = tableHead.getElementsByTagName('nexus-icon');
    sortIcon1[0].dispatchEvent(iconEvent);
    await page.waitForChanges();

    const sortIcon2 = tableHead.getElementsByTagName('nexus-icon');
    sortIcon2[0].dispatchEvent(iconEvent);
    await page.waitForChanges();

    nexusCheckbox[0].checked = true;
    nexusCheckbox[0].dispatchEvent(changeEvent);
    await page.waitForChanges();

    nexusCheckbox[0].checked = false;
    nexusCheckbox[0].dispatchEvent(changeEvent);
    await page.waitForChanges();

    const totalPages = page.body.querySelector('nexus-pagination').getAttribute('max');
    expect(totalPages).toEqual('6');
  });

  it('pagination without page size select', async () => {
    const page = await newSpecPage({
      components: [NexusTable],
      template: () => (
        <nexus-table
          rows={rows.concat(...rows)}
          columns={columnDefs}
          pagination={true}
          rowSelection={true}
          pageSizeOpt={[2, 5, 10, 20]}
          pageSize={2}
          enablePageSizeOption={false}
        >
          {' '}
        </nexus-table>
      )
    });

    const tableHead = page.body.querySelector('thead');
    const nexusCheckbox = tableHead.getElementsByTagName('nexus-checkbox');
    expect(nexusCheckbox[0].checked).toBeFalsy();
  });
});
