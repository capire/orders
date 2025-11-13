using { sap.capire.orders as my } from '../db/schema';

service OrdersService {
  entity Orders as projection on my.Orders;

  @odata.draft.bypass
  // @requires: [ 'system-user', 'authenticated-user' ] // REVISIT: currently does not work locally
  entity OrdersNoDraft as projection on my.Orders;

  event OrderChanged {
    product: String;
    deltaQuantity: Integer;
  }

}
