class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      // variables for shortening code.
      let name = this.items[i].name;
      let quality = this.items[i].quality;
      let sellIn = this.items[i].sellIn;
      switch (name) {
        case 'Aged Brie': 
          quality < 50 ? this.items[i].quality ++ : null;
          break;
        case 'Backstage passes to a TAFKAL80ETC concert':
          sellIn > 10 ? this.items[i].quality ++ :
          sellIn < 11 && sellIn > 5 ? this.items[i].quality += 2 :
          sellIn < 6 && sellIn >= 0 ? this.items[i].quality += 3 :
          sellIn < 0 ? this.items[i].quality = 0 : null;
          this.items[i].quality > 50 ? this.items[i].quality = 50 : null;
          break;
        case 'Sulfuras, Hand of Ragnaros':
          break;
        case 'Conjured':
          sellIn >= 0 ? this.items[i].quality -= 2 :
          sellIn < 0 ? this.items[i].quality -= 4 : null;
          this.items[i].quality < 0 ? this.items[i].quality = 0 : null;
          break;
        default :
          sellIn >= 0 ? this.items[i].quality -= 1 :
          sellIn < 0 ? this.items[i].quality -= 2 : null;
          this.items[i].quality < 0 ? this.items[i].quality = 0 : null;
      }
      name !== 'Sulfuras, Hand of Ragnaros' ? this.items[i].sellIn -- : null;
    }
    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
