import ExcelJS, { CellValue, Workbook, Worksheet } from 'exceljs';
import { Product } from '../db/schema/Product';
import { AgeGroupType, GenderType, SizeType, VariantType } from '../types/custom_types';

const HEADER_ROW = 5;
const DATA_ROW = 6;
const MAX_ROWS = 500;
const NEW_PRODUCT_SEPERATOR = "<<NEW>>";
const IMG_FRONT_COL = 9; // 1-based index (1-A, 2-B, etc.)
const IMG_REAR_COL = 10; // 1-based index (1-A, 2-B, etc.)
const PRODUCT_ID = 1;
const CATEGORY = 2;
const SUP_NAME = 3;

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
   const interval = sizes.length;

   const sheet = workbook.addWorksheet('Product', {views: [{state: 'frozen', ySplit: 4}]});

   // Product metadata
   sheet.mergeCells(`A${PRODUCT_ID}:D${PRODUCT_ID}`);
   const supplierId = sheet.getCell(`A${PRODUCT_ID}`);
   supplierId.value = 'Product ID: Moose-Tshirt-01';
   supplierId.font = {bold: true};

   sheet.mergeCells(`A${CATEGORY}:D${CATEGORY}`);
   const categoryMetadata = sheet.getCell(`A${CATEGORY}`);
   categoryMetadata.value = 'Category: T-Shirt';
   categoryMetadata.font = {bold: true};

   sheet.mergeCells(`A${SUP_NAME}:D${SUP_NAME}`);
   const supplierName = sheet.getCell(`A${SUP_NAME}`);
   supplierName.value = 'Supplier: Moose';
   supplierName.font = {bold: true};

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
   sheet.getRow(HEADER_ROW).font = { bold: true };
   sheet.getCell(`A${HEADER_ROW}`).value = 'Variant Id';
   sheet.getCell(`B${HEADER_ROW}`).value = 'Name';
   sheet.getCell(`C${HEADER_ROW}`).value = 'Color';
   sheet.getCell(`D${HEADER_ROW}`).value = 'Design';
   sheet.getCell(`E${HEADER_ROW}`).value = 'Price';
   sheet.getCell(`F${HEADER_ROW}`).value = 'Size';
   sheet.getCell(`G${HEADER_ROW}`).value = 'Quantity';
   sheet.getCell(`H${HEADER_ROW}`).value = 'Description';
   sheet.getCell(`${HEADER_ROW}`).value = 'Front Image';
   sheet.getCell(`${HEADER_ROW}`).value = 'Rear Image';


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


   for (let currentRow = DATA_ROW; currentRow <= MAX_ROWS; currentRow += interval+1) {
      sheet.getCell(`A${currentRow}`).dataValidation = {
         type: 'list',
         allowBlank: false,
         formulae: ['"<<NEW>>"']
      };
      sheet.getCell(`A${currentRow}`).value = '<<NEW>>';
   }

   for (let i=DATA_ROW; i<=MAX_ROWS; i++) {
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


   for (let currentRow=DATA_ROW+1; currentRow <= MAX_ROWS; currentRow) {
    // Insert sizes
    for (const size of sizes) {
      if (currentRow > MAX_ROWS) break;
      sheet.getCell(`F${currentRow}`).dataValidation = {
         type: 'whole',
         formulae: [`'"${size}"'`],
         allowBlank: false
      }
      sheet.getCell(`F${currentRow}`).value = size;
      currentRow++;
    }
    // Insert an empty row
    if (currentRow <= MAX_ROWS) {
      sheet.getCell(`F${currentRow}`).value = '';
      currentRow++;
    }
  }


   return sheet;
}


export async function readProductExcel(file: string) {
   console.log(file);
   const workbook = new ExcelJS.Workbook();
   await workbook.xlsx.readFile(file)
   // .then(()=> {

   

   const sheet = workbook.getWorksheet('Product');
   if (sheet!=undefined) {
      const product: Partial<Product> = {variants: []};

      const images = sheet.getImages();

      const productId = sheet.getCell(`A${PRODUCT_ID}`).value?.toString().split(':')[1].trim();
      const supplier = sheet.getCell(`A${SUP_NAME}`).value?.toString().split(':')[1].trim();
      const category = sheet.getCell(`A${CATEGORY}`).value?.toString().split(':')[1].trim();
      const gender = sheet.getCell('F1').value?.toString() as GenderType ;
      const age_group = sheet.getCell('F2').value?.toString() as AgeGroupType;

      if (productId && supplier && category && gender && age_group) {
         product.product_id = productId;
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
            msg: "Cannot read rows from sheet."
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
                  return { isSuccess: false, msg: `Cannot read name from cell B${row.number}`, data: null };
               else
                  product.name = name;

               const price = row.getCell('E').value?.toString();
               if (price==undefined)
                  return { isSuccess: false, msg: `Cannot read name from cell D${row.number}`, data: null };
               else
                  product.price = price;
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
                     return { isSuccess: false, msg: `Cannot read name from cell D${row.number}`, data: null };
                  else
                     variant.design = design;

                  const color = row.getCell('C').value?.toString();
                  if (color==undefined)
                     return { isSuccess: false, msg: `Cannot read name from cell C${row.number}`, data: null };
                  else
                     variant.color = color;

                  const description = row.getCell('H').value?.toString();
                  if (description==undefined)
                     return { isSuccess: false, msg: `Cannot read name from cell H${row.number}`, data: null };
                  else
                     variant.description = description;

                  const size = row.getCell('F').value?.toString() as string;
                  const quantity = parseInt(row.getCell('G').value!.toString());
                  sizes.push({size: size, stock_quantity: quantity});

                  const img_front = getImageByCell(IMG_FRONT_COL, row.number, sheet, images);
                  const img_rear = getImageByCell(IMG_REAR_COL, row.number, sheet, images);
                  if (quantity>0 && img_front==null)
                     return { isSuccess: false, msg: `Cannot get front image from cell I${row.number}`, data: null };
                  variant.img_front = img_front? workbook.getImage(Number(img_front.imageId)).buffer : null;
                  variant.img_rear = img_rear!=null ? workbook.getImage(Number(img_rear.imageId)).buffer : null;

               }
            }
            else {
               const size = row.getCell('F').value?.toString() as string;
               const quantity = parseInt(row.getCell('G').value!.toString());
               sizes.push({size: size, stock_quantity: quantity});

               const img_front = getImageByCell(IMG_FRONT_COL, row.number, sheet, images);
               const img_rear = getImageByCell(IMG_REAR_COL, row.number, sheet, images);
               if (quantity>0 && img_front==null)
                  return { isSuccess: false, msg: `Cannot get front image from cell I${row.number}`, data: null };
               variant.img_front = img_front? workbook.getImage(Number(img_front.imageId)).buffer : null;
               variant.img_rear = img_rear!=null ? workbook.getImage(Number(img_rear.imageId)).buffer : null;
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
   // return {
   //    isSuccess: false,
   //    data: null,
   //    msg: "Couldn't read excel file, something went wrong!",
   //    error: "Couldn't read excel file, something went wrong!"
   // }
// });
}


function getImageByCell(column: number, row: number, sheet: Worksheet, images: {
   type: "image";
   imageId: string;
   range: ExcelJS.ImageRange;
}[]) {
   for (const image of images) {
      const { range } = image;
      // Check if the image's range includes the specified cell address
      if (range.tl.nativeCol === column - 1 &&
         range.tl.nativeRow === row - 1) {
      return image;
      }
   }
   return null;
}