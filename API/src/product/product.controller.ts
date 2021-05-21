import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ApiTags, ApiNotFoundResponse, ApiOkResponse } from "@nestjs/swagger";

@ApiTags("Product")
@Controller("product")
// @UseGuards(JwtAuthGuard) : apply the guard to all the routes
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Post("bulk")
  createBulk() {
    return this.productService.bulkCreate();
  }

  @Get()
  findAll(
    @Query("page") page: number = 1,
    @Query("size") size: number = 20,
    @Query("minPrice") minPrice: number = 1,
    @Query("maxPrice") maxPrice: number = 5000,
    @Query("searchData") searchData: string,
    @Query("sortName") sortName: string,
    @Query("sortPrice") sortPrice: string
  ) {
    if (sortName == "productSalePrice" && sortPrice == "ASC") {
      return this.productService.findAllpa(
        page,
        size,
        minPrice,
        maxPrice,
        searchData
      );
    }
    if (sortName == "productSalePrice" && sortPrice == "DESC") {
      return this.productService.findAllpd(
        page,
        size,
        minPrice,
        maxPrice,
        searchData
      );
    }

    if (sortName == "productName" && sortPrice == "ASC") {
      return this.productService.findAllna(
        page,
        size,
        minPrice,
        maxPrice,
        searchData
      );
    }
    if (sortName == "productName" && sortPrice == "DESC") {
      return this.productService.findAllnd(
        page,
        size,
        minPrice,
        maxPrice,
        searchData
      );
    }
    return this.productService.findAll(
      page,
      size,
      minPrice,
      maxPrice,
      searchData
    );
  }

  @Get("search")
  findByQuery(@Query("q") query: string) {
    return this.productService.findByQuery(query);
  }

  @ApiNotFoundResponse({
    description: "No data is found for the specified ID",
  })
  @ApiOkResponse({ description: "Product Data found" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.productService.remove(+id);
  }
}