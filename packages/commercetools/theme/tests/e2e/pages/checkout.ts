import { Customer, Address } from '../types/types';
import Base from './base';
import { el } from './utils/element';

class Checkout extends Base {

  protected step = ''

  get firstName(): Cypress.Chainable {
    return el(`${this.step}-firstName`);
  }

  get lastName(): Cypress.Chainable {
    return el(`${this.step}-lastName`);
  }

  get streetName(): Cypress.Chainable {
    return el(`${this.step}-streetName`);
  }

  get apartment(): Cypress.Chainable {
    return el(`${this.step}-apartment`);
  }

  get city(): Cypress.Chainable {
    return el(`${this.step}-city`);
  }

  get state(): Cypress.Chainable {
    return el(`${this.step}-state`, 'select');
  }

  get country(): Cypress.Chainable {
    return el(`${this.step}-country`, 'select');
  }

  get zipcode(): Cypress.Chainable {
    return el(`${this.step}-zipcode`);
  }

  get phone(): Cypress.Chainable {
    return el(`${this.step}-phone`);
  }

  public fillForm(address: Address) {
    if (address.firstName !== undefined) this.firstName.type(address.firstName);
    if (address.lastName !== undefined) this.lastName.type(address.lastName);
    if (address.streetName !== undefined) this.streetName.type(address.streetName);
    if (address.apartment !== undefined) this.apartment.click().type(address.apartment);
    if (address.city !== undefined) this.city.type(address.city);
    if (address.country !== undefined) this.country.select(address.country);
    if (address.state !== undefined) this.state.select(address.state);
    if (address.postalCode !== undefined) this.zipcode.type(address.postalCode);
    if (address.phone !== undefined) this.phone.type(address.phone);
  }
}

class Shipping extends Checkout {

  constructor() {
    super();
    this.step = 'shipping';
  }

  get path(): string {
    return '/checkout/shipping';
  }

  get addresses(): Cypress.Chainable {
    return el('shipping-addresses', '.sf-radio label');
  }

  get continueToBillingButton(): Cypress.Chainable {
    return el('continue-to-billing');
  }

  get heading(): Cypress.Chainable {
    return el(`${this.step}-heading`);
  }

  get selectShippingButton(): Cypress.Chainable {
    return el('select-shipping');
  }

  get shippingMethods(): Cypress.Chainable {
    return el('shipping-method-label');
  }

  public fillForm(customer: Customer) {
    super.fillForm(customer.address.shipping);
  }

}

class Billing extends Checkout {

  constructor() {
    super();
    this.step = 'billing';
  }

  get path(): string {
    return '/checkout/billing';
  }

  get continueToPaymentButton(): Cypress.Chainable {
    return el('continue-to-payment');
  }

  get heading(): Cypress.Chainable {
    return el(`${this.step}-heading`);
  }

  get copyAddressLabel(): Cypress.Chainable {
    return el('copy-address', 'label');
  }

  public fillForm(customer: Customer) {
    super.fillForm(customer.address.billing);
  }
}

class Payment {
  get heading(): Cypress.Chainable {
    return el('heading-payment');
  }

  get makeAnOrderButton(): Cypress.Chainable {
    return el('make-an-order');
  }

  get paymentMethods(): Cypress.Chainable {
    return el('payment-method');
  }

  get terms(): Cypress.Chainable {
    return el('terms', 'label');
  }
}

class ThankYou {
  get heading(): Cypress.Chainable {
    return el('thank-you-banner', 'h2');
  }
}

export {
  Shipping,
  Billing,
  Payment,
  ThankYou
};
