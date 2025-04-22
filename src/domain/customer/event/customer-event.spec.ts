import EventDispatcher from "../../@shared/event/event-dispatcher";
import Customer from "../entity/customer";
import Address from "../value-object/address";
import { AddressChangedEvent } from "./address-changed.event";
import { CustomerCreatedEvent } from "./customer-created.event";
import { LogWhenCustomerIsCreated1 } from "./handler/1-log-when-customer-is-created.handler";
import { LogWhenCustomerIsCreated2 } from "./handler/2-log-when-customer-is-created.handler";
import { LogWhenAddressIsChanged } from "./handler/log-when-address-is-changed.handler";

describe("Customer domain events", () => {
  it("should trigger event when new customer is created", () => {
    const eventDispatcher = new EventDispatcher();

    const logHandler1 = new LogWhenCustomerIsCreated1();
    const logHandler2 = new LogWhenCustomerIsCreated2();

    const handler1Spy = jest.spyOn(logHandler1, "handle");
    const handler2Spy = jest.spyOn(logHandler2, "handle");

    const EVENT_NAME = CustomerCreatedEvent.name;
    eventDispatcher.register(EVENT_NAME, logHandler1);
    eventDispatcher.register(EVENT_NAME, logHandler2);

    const customer = new Customer("123", "John Doe");

    const event = new CustomerCreatedEvent(customer);

    eventDispatcher.notify(event);

    expect(handler1Spy).toHaveBeenCalledTimes(1);
    expect(handler2Spy).toHaveBeenCalledTimes(1);
  });

  it("should trigger event when address is changed", () => {
    const eventDispatcher = new EventDispatcher();

    const addressChangeHandler = new LogWhenAddressIsChanged();

    const handler = jest.spyOn(addressChangeHandler, "handle");

    const EVENT_NAME = AddressChangedEvent.name;
    eventDispatcher.register(EVENT_NAME, addressChangeHandler);

    const customer = new Customer("123", "John Doe");
    const address = new Address("Test", 999, "99999-99", "Test City");
    customer.changeAddress(address);

    const event = new AddressChangedEvent(customer);

    eventDispatcher.notify(event);

    expect(handler).toHaveBeenCalledTimes(1);
  });
});
