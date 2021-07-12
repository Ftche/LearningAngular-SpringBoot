import { CartItem } from './../../common/cart-item';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product();
  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  constructor(private productService: ProductService,
              private route: ActivatedRoute, private cartService: CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
    this.updateCartStatus();
  }

  handleProductDetails() {

    // get the "id" param string. convert string to a number using the "+" symbol
    const theProductId: number = +this.route.snapshot.paramMap.get('id');

    this.productService.getProduct(theProductId).subscribe(
      data => {
        this.product = data;
      }
    );
  }

  addToCart(theProduct: Product){
    //
    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);

    const theCartItem = new CartItem(theProduct);

    this.cartService.addToCart(theCartItem);
  }

  updateCartStatus() {
    // subscribe to the cart totalprice
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );
    // subscribe to the cart totalquantity
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
  }



}
