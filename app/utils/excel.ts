import ExcelJS, { CellValue, Workbook } from 'exceljs';
import { Product } from '../db/schema/Product';
import { AgeGroupType, GenderType, SizeType, VariantType } from '../types/custom_types';

const DATA_ROW = 5;
const MAX_ROWS = 500;
const NEW_PRODUCT_SEPERATOR = "<<NEW>>";

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
   const startRow = 5;
   const interval = sizes.length;
   const maxRows = 500;

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


   for (let currentRow = startRow; currentRow <= maxRows; currentRow += interval+1) {
      sheet.getCell(`A${currentRow}`).dataValidation = {
         type: 'list',
         allowBlank: false,
         formulae: ['"<<NEW>>"']
      };
      sheet.getCell(`A${currentRow}`).value = '<<NEW>>';
   }

   for (let i=startRow; i<=maxRows; i++) {
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


   for (let currentRow=startRow+1; currentRow <= maxRows; currentRow) {
    // Insert sizes
    for (const size of sizes) {
      if (currentRow > maxRows) break;
      sheet.getCell(`F${currentRow}`).dataValidation = {
         type: 'whole',
         formulae: [`'"${size}"'`],
         allowBlank: false
      }
      sheet.getCell(`F${currentRow}`).value = size;
      currentRow++;
    }
    // Insert an empty row
    if (currentRow <= maxRows) {
      sheet.getCell(`F${currentRow}`).value = '';
      currentRow++;
    }
  }


   return sheet;
}


export function readProductExcel(file: string) {
   const workbook = new ExcelJS.Workbook();
   workbook.xlsx.readFile(file).then(()=> {

   

   const sheet = workbook.getWorksheet('Product');
   if (sheet!=undefined) {
      const product: Partial<Product> = {variants: []};

      const supplier = sheet.getCell('A2').value?.toString().split(':')[1].trim();
      const category = sheet.getCell('A1').value?.toString().split(':')[1].trim();
      const gender = sheet.getCell('F1').value?.toString() as GenderType ;
      const age_group = sheet.getCell('F2').value?.toString() as AgeGroupType;

      if (supplier && category && gender && age_group) {
         product.supplier = supplier;
         product.category = category;
         product.gender = gender;
         product.ageGroup = age_group
      }
      else {
         return {
            isSuccess: false,
            data: null,
            msg: ""
         }
      }

      
      const rows = sheet.getRows(DATA_ROW, MAX_ROWS);
      if (rows==undefined) {
         return {
            isSuccess: false,
            data: null,
            msg: "Cannot read rows form sheet."
         };
      }

      let counter = 0;
      let sizes: SizeType[] = [];
      let variant: Partial<VariantType> = {};
      for(const row of rows){
         if (row.number >= DATA_ROW) {
            if (row.number == DATA_ROW+1) {
               const name = row.getCell('B').value?.toString();
               if (name==undefined)
                  return { isSuccess: false, msg: `Cannot read name from cell B${row.number}` };
               else
                  product.name = name;

               const price = row.getCell('E').value?.toString();
               if (price==undefined)
                  return { isSuccess: false, msg: `Cannot read name from cell D${row.number}` };
               else
                  product.price = parseFloat(price);
            }

            if (row.getCell('A').value == NEW_PRODUCT_SEPERATOR) {
               if(sizes.length!=0) {
                  variant.sizes = sizes;
                  product.variants?.push(variant as VariantType);
               }
               counter = 0;
               sizes = [];
               continue;
            }

            if (counter == 0) {
               const variant_id = row.getCell('A').value?.toString();
               if (variant_id == undefined) {
                  return {
                     isSuccess: true,
                     data: product,
                     msg: "Successfully read the excel file",
                     error: ""
                  };
               }
               else {
                  // const variant_id = row.getCell('A').value?.toString();
                  // if (variant_id==undefined)
                  //    return { isSuccess: false, msg: `Cannot read name from cell A${row.number}` };
                  // else
                  variant.variant_id = variant_id;

                  const design = row.getCell('D').value?.toString();
                  if (design==undefined)
                     return { isSuccess: false, msg: `Cannot read name from cell D${row.number}` };
                  else
                     variant.design = design;

                  const color = row.getCell('C').value?.toString();
                  if (color==undefined)
                     return { isSuccess: false, msg: `Cannot read name from cell C${row.number}` };
                  else
                     variant.color = color;

                  const description = row.getCell('H').value?.toString();
                  if (description==undefined)
                     return { isSuccess: false, msg: `Cannot read name from cell H${row.number}` };
                  else
                     variant.description = description;

                  const size = row.getCell('F').value?.toString() as string;
                  const quantity = row.getCell('G').value?.toString() as string;
                  sizes.push({size: size, stock_quantity: parseInt(quantity)});
               }
            }
            else {
               const size = row.getCell('F').value?.toString() as string;
               const quantity = row.getCell('G').value?.toString() as string;
               
               sizes.push({size: size, stock_quantity: parseInt(quantity)});
            }

            counter++;
            // if (sheet.getCell(`A${rowNumber-1}`).value == "<<NEW>>") {
            //    const variant_id = sheet.getCell(`A${rowNumber}`).value?.toString().trim();
            //    if (variant_id == undefined) {
            //       return {
            //          isSuccess: true,
            //          data: product,
            //          msg: "Successfully read the excel file",
            //          error: ""
            //       };
            //    }
            //    else {
            //       // const name = sheet.getCell(`B${rowNumber}`).value?.toString();
            //       // const color = sheet.getCell(`C${rowNumber}`).value?.toString();
            //       // const design = sheet.getCell(`D${rowNumber}`).value?.toString();
            //       // const price = sheet.getCell(`E${rowNumber}`).value?.toString();
            //       const size = sheet.getCell(`F${rowNumber}`).value?.toString();
            //       const quantity = sheet.getCell(`G${rowNumber}`).value?.toString();
            //       // const description = sheet.getCell(`H${rowNumber}`).value?.toString();

            //       product.variant.push({
            //          variant_id: variant_id,
            //          color: color,
            //          sizes: []
            //          design: design,
            //          price: price
            //       })
            //    }
            // }

         }

      }
   }
})
}