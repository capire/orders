using { sap.capire.orders as my } from '../db/schema';
namespace sap.capire.orders.api;

service OrdersService {
  entity Orders as projection on my.Orders;

  @odata.draft.bypass
  @requires: [ 'system-user', 'authenticated-user' ]
  entity OrdersNoDraft as projection on my.Orders;

  event OrderChanged {
    product: String;
    deltaQuantity: Integer;
  }

}
