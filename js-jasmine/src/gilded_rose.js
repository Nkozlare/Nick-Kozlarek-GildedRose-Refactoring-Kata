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
    for (var i = 0; i < this.items.length; i++) {
      let name = this.item[i].name;
      let quality = this.item[i].quality;
      let sellIn = this.item[i].sellIn;
      if (name != 'Aged Brie' && name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (quality > 0) {
          if (name != 'Sulfuras, Hand of Ragnaros') {
            quality = quality - 1;
          }
        }
      } else {
        if (quality < 50) {
          quality = quality + 1;
          if (name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (sellIn < 11) {
              if (quality < 50) {
                // updated quality to increase to two if less than 11 days out
                quality += 2;
              }
            }
            if (sellIn < 6) {
              if (quality < 50) {
                // updated quality to increase to three if less than 6 days out
                quality += 3;
              }
            }
          }
        }
      }
      if (name != 'Sulfuras, Hand of Ragnaros') {
        sellIn --;
      }
      if (sellIn < 0) {
        if (name != 'Aged Brie') {
          if (name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (quality > 0) {
              if (name != 'Sulfuras, Hand of Ragnaros') {
                quality --;
              }
            }
          } else {
            quality = quality - quality;
          }
        } else {
          if (quality < 50) {
            quality ++;
          }
        }
      }
    }

    return this.items;
  }
}
module.exports = {
  Item,
  Shop
}
