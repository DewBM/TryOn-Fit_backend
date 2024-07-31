import ExcelJS, { CellValue, Workbook } from 'exceljs';



export function createExcel() {
   // Create a new workbook and add a worksheet
   const workbook = new ExcelJS.Workbook();
   const worksheet = workbook.addWorksheet('Sheet1');
   
   // Add header row
   // worksheet.addRow(['Description', 'Image Placeholder']);
   
   // // Add a few rows with placeholders
   // worksheet.addRow(['Item 1', 'Click to add image']);
   // worksheet.addRow(['Item 2', 'Click to add image']);
   // worksheet.addRow(['Item 3', 'Click to add image']);

   worksheet.getCell('A1').dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: ['"One,Two,Three,Four"']
   };
   
   // Save the workbook to a file
   workbook.xlsx.writeFile('example_with_placeholders.xlsx')
     .then(() => {
       console.log('File created with placeholders!');
     });
}


export function readExcelFile() {
   // Create a new workbook instance and read the file
   const workbook = new ExcelJS.Workbook();
   workbook.xlsx.readFile('data-excel.xlsx')
   .then(() => {
      const worksheet = workbook.getWorksheet('Sheet1');

      if (worksheet!=undefined) {
         worksheet.getImages().forEach(image => {
            const row = worksheet.getRow(image.range.tl.nativeRow + 1); // tl refers to top-left of the image's range
            console.log(`Found image in row ${row.number}`);
   
            // Example: Save the image to a file
            const buffer = workbook.getImage(Number(image.imageId)).buffer;
            require('fs').writeFileSync(`row_${row.number}_image.png`, buffer);
         });
      }
   });
}


export function createProductTemplate(supplier: string, category: string) {
   const workbook = new ExcelJS.Workbook();
   const sheet = addProductSheet(workbook, ['Male', 'Female', 'Unisex'], ['Adult', 'Kids'], ['S', 'M', 'L', 'XL', 'XXL', 'XXXL']);
   
   workbook.xlsx.writeFile('sample.xlsx')
     .then(() => {
       console.log('File created!');
     });
}


export function addProductSheet(workbook: Workbook, gender_list: string[], age_groups: string[], sizes: string[]) {
   const sheet = workbook.addWorksheet('Product', {views: [{state: 'frozen', ySplit: 4}]});

   // Product metadata
   sheet.mergeCells('A1:D1');
   const categoryMetadata = sheet.getCell('A1');
   categoryMetadata.value = 'Category: T-Shirt';
   categoryMetadata.font = {bold: true};

   sheet.mergeCells('A2:D2');
   const supplierMetadata = sheet.getCell('A2');
   supplierMetadata.value = 'Supplier: Moose';
   supplierMetadata.font = {bold: true};

   const genderHeader = sheet.getCell('E1');
   genderHeader.value = 'Gender: ';
   genderHeader.font = {bold: true};
   sheet.getCell('F1').dataValidation = {
      type: 'list',
      allowBlank: false,
      formulae: [`"${gender_list.join(',')}"`]
   };

   const ageGroupHeader = sheet.getCell('E2');
   ageGroupHeader.value = 'Age Group: ';
   ageGroupHeader.font = {bold: true};
   sheet.getCell('F2').dataValidation = {
      type: 'list',
      allowBlank: false,
      formulae: [`"${age_groups.join(',')}"`]
   };



   // Product table column headers
   sheet.getRow(4).font = { bold: true };
   sheet.getCell('A4').value = 'Variant Id';
   sheet.getCell('B4').value = 'Name';
   sheet.getCell('C4').value = 'Color';
   sheet.getCell('D4').value = 'Design';
   sheet.getCell('E4').value = 'Price';
   sheet.getCell('F4').value = 'Size';
   sheet.getCell('G4').value = 'Quantity';
   sheet.getCell('H4').value = 'Description';
   sheet.getCell('I4').value = 'Front Image';
   sheet.getCell('J4').value = 'Rear Image';


   sheet.columns = [
      { key: 'varient', width: 20 },
      { key: 'name', width: 32 },
      { key: 'color', width: 20 },
      { key: 'design', width: 30 },
      { key: 'price', width: 10 },
      { key: 'size', width: 10 },
      { key: 'quantity', width: 10 },
      { key: 'description', width: 40},
      { key: 'fornt_image', width: 15 },
      { key: 'rear_image', width: 15 }
   ];


   sheet.getColumn('D').alignment = { wrapText: true }
   sheet.getColumn('H').alignment = { wrapText: true }


   const startRow = 5;
   const interval = sizes.length;
   const maxRows = 500;

   for (let currentRow = startRow+interval; currentRow <= maxRows; currentRow += interval) {
      sheet.getCell(`A${currentRow}`).dataValidation = {
         type: 'list',
         allowBlank: false,
         formulae: ['"<<NEW>>"']
      };
   }

   for (let i=startRow; i<=maxRows; i++) {
      sheet.getCell(`F${i}`).dataValidation = {
         type: 'list',
         allowBlank: false,
         formulae: [`"${sizes.join(',')}"`]
      };
      sheet.getCell(`E${i}`).dataValidation = {
         type: 'decimal',
         operator: 'greaterThan',
         formulae: ['0'],
         showErrorMessage: true,
         errorTitle: 'Invalid input',
         error: 'Please enter a positive decimal value.',
      }
      sheet.getCell(`G${i}`).dataValidation = {
         type: 'whole',
         operator: 'greaterThanOrEqual',
         formulae: ['0'],
         showErrorMessage: true,
         errorTitle: 'Invalid input',
         error: 'Please enter a positive integer or zero.',
      }
   }

   // sheet.getColumn('H').width = 30;
   // sheet.getColumn('H').alignment = {wrapText: true}

   return sheet;
}