import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit{
  products: any[] = [];
  allProducts: any[] = [];
  searchQuery: string = '';
  private searchSubject = new Subject<string>();
  
  constructor(private productService: ProductService){

  }
  
  ngOnInit(){
    this.loadProducts();
    this.setupSearch();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.allProducts = data.products;
        this.products = data.products;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        // Handle error - could show user message
      }
    });
  }

  setupSearch() {
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(searchText => {
        this.filterProducts(searchText);
      });
  }

  onSearchChange(searchText: string) {
    this.searchSubject.next(searchText);
  }

  filterProducts(searchText: string) {
    if (!searchText.trim()) {
      this.products = this.allProducts;
    } else {
      this.products = this.allProducts.filter(product =>
        product.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }
  }

  addProduct() {
    const newProduct = {
      title: 'New Product',
      description: 'Product description',
      price: 100,
      category: 'electronics'
    };
    
    this.productService.addProduct(newProduct).subscribe({
      next: (data) => {
        console.log('Product added:', data);
        // Update both arrays
        this.allProducts.push(data);
        this.products.push(data);
      },
      error: (error) => {
        console.error('Error adding product:', error);
      }
    });
  }

  updateProduct(id: number) {
    const updatedProduct = {
      title: 'Updated Product'
    };
    
    this.productService.updateProduct(id, updatedProduct).subscribe({
      next: (data) => {
        console.log('Product updated:', data);
        // Update both arrays
        const allIndex = this.allProducts.findIndex((product: any) => product.id === id);
        if (allIndex !== -1) {
          this.allProducts[allIndex] = data;
        }
        const filteredIndex = this.products.findIndex((product: any) => product.id === id);
        if (filteredIndex !== -1) {
          this.products[filteredIndex] = data;
        }
      },
      error: (error) => {
        console.error('Error updating product:', error);
      }
    });
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe({
      next: (data) => {
        console.log('Product deleted:', data);
        // Update both arrays
        this.allProducts = this.allProducts.filter((product: any) => product.id !== id);
        this.products = this.products.filter((product: any) => product.id !== id);
      },
      error: (error) => {
        console.error('Error deleting product:', error);
      }
    });
  }
}
