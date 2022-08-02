let counter = 0;

class Shipment {
  private static instace: Shipment
  private shipmentID: number

  private constructor() {
    this.shipmentID = counter++;
    console.log("constructor called!");
  }

  public static getInstance(): Shipment {
    if (!Shipment.instace) {
      Shipment.instace = new Shipment();
    }

    return Shipment.instace;
  }

  public getShipmentId() {
    return this.shipmentID
  }

  public ship(shipId: number, shipFrom: string, shipTo: string, cost: number) {
    return `Shipment ID: ${shipId}. The item was ship from ${shipFrom} and it goes to ${shipTo}. The total cost was ${cost}`
  }
}

interface ClientData {
  weight: number
  fromAddress: string
  fromZipCode: string
  toAddress: string
  toZipCode: string
}

class Client {
  data: ClientData
  shipmentID: number
  myInstance: Shipment = Shipment.getInstance();

  constructor(data: ClientData) {
    this.data = data
    this.shipmentID =  this.myInstance.getShipmentId()
  }

  ship() {
    this.myInstance.ship(this.shipmentID, this.data.fromAddress, this.data.toAddress, 39)
  }
}
