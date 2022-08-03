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

  public getPackageType(weight: number): string {
    let result;
    if (weight <= 15) {
      result = 'Letter'
    } else if (weight > 15 && weight <+ 160) {
      result = 'Package'
    } else {
      result = 'OverSized'
    }

    return result;
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
  packageType: string
  weigth: number
  
  constructor(packageType: string, weigth: number) {
    this.packageType = packageType
    this.weigth = weigth
  }
  public getCost(): number {
    let cost;
    if (this.packageType === 'Letter') {
      cost = 0.39 * this.weigth
    } else if (this.packageType === 'Package') {
      cost = 0.25 * this.weigth
    } else {
      cost = (0.25 * this.weigth) + 10
    }
    return cost
  }
}

class ChicagoSprinterShipper implements CalculateCostByShipper {
  packageType: string
  weigth: number
  
  constructor(packageType: string, weigth: number) {
    this.packageType = packageType
    this.weigth = weigth
  }

  public getCost(): number {
    let cost;
    if (this.packageType === 'Letter') {
      cost = 0.42 * this.weigth
    } else if (this.packageType === 'Package') {
      cost = 0.20 * this.weigth
    } else {
      cost = 0
    }
    return cost
  }
}

class PacificParcelShipper implements CalculateCostByShipper {
  packageType: string
  weigth: number
  
  constructor(packageType: string, weigth: number) {
    this.packageType = packageType
    this.weigth = weigth
  }

  public getCost(): number {
    let cost;
    if (this.packageType === 'Letter') {
      cost = 0.51 * this.weigth
    } else if (this.packageType === 'Package') {
      cost = 0.19 * this.weigth
    } else {
      cost = (0.19 * this.weigth) + (0.02 * this.weigth)
    }
    return cost
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
    return this.myInstance.ship(this.shipmentID, this.data.fromAddress, this.data.toAddress, this.getCost())
  }

  getPackageType() {
    return this.myInstance.getPackageType(this.data.weight)
  }

  getCost(): number {
    let result;

    if(this.data.fromZipCode === '' || this.data.fromZipCode === null) {
      result = new Shipper(new AirEastShipper(this.getPackageType(), this.data.weight))
    }

    if (this.data.fromZipCode.startsWith('1') || this.data.fromZipCode.startsWith('2') || this.data.fromZipCode.startsWith('3')) {
      result = new Shipper(new AirEastShipper(this.getPackageType(), this.data.weight))
    } else if (this.data.fromZipCode.startsWith('4') || this.data.fromZipCode.startsWith('5') || this.data.fromZipCode.startsWith('6')) {
      result = new Shipper(new ChicagoSprinterShipper(this.getPackageType(), this.data.weight))
    } else {
      result = new Shipper(new PacificParcelShipper(this.getPackageType(), this.data.weight))
    }
    return result;
  }
}
