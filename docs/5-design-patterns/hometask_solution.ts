let counter = 0;

class Shipment {
  private static instace: Shipment
  private shipmentID: number

  private constructor() {
    this.shipmentID = counter++;
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

export interface CalculateCostByShipper {
  getCost(): number;
}

const mockedFunction = {
  getCost() {
    return 39
  }
}

class Shipper {
  private static instace: Shipper
  cost: CalculateCostByShipper

  constructor(cost: CalculateCostByShipper) {
    this.cost = cost
  }

  public getCost(): void {
    this.cost.getCost()
  }
}

class AirEastShipper implements CalculateCostByShipper {
  public getCost(): number {
    return 39
  }
}

class ChicagoSprinterShipper implements CalculateCostByShipper {
  public getCost(): number {
    return 42
  }
}

class PacificParcelShipper implements CalculateCostByShipper {
  public getCost(): number {
    return 51
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

  getCost(): number {
    let result;

    if(this.data.fromZipCode === '' || this.data.fromZipCode === null) {
      result = new Shipper(new AirEastShipper())
    }

    if (this.data.fromZipCode.startsWith('1') || this.data.fromZipCode.startsWith('2') || this.data.fromZipCode.startsWith('3')) {
      result = new Shipper(new AirEastShipper())
    } else if (this.data.fromZipCode.startsWith('4') || this.data.fromZipCode.startsWith('5') || this.data.fromZipCode.startsWith('6')) {
      result = new Shipper(new ChicagoSprinterShipper())
    } else {
      result = new Shipper(new PacificParcelShipper())
    }
    return result;
  }
}
