const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {
  it("should foo", function() {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });

  it("Should create a firey hammer correctly and be never decay", function() {
    const gildedRose = new Shop([new Item('Sulfuras, Hand of Ragnaros', 30, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
  })

  it("Should create cheese that just gets better, but no better than 50", function() {
    const gildedRose = new Shop([new Item('Aged Brie', 50, 49)]);
    const test1 = gildedRose.updateQuality();
    const test2 = gildedRose.updateQuality();
    expect(test1[0].quality).toBe(50);
    expect(test2[0].quality).not.toBe(51);
  })

  it("Should create a pass to the Elite Tauren Chieftan concert and correctly calculate quality", function() {
    const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 11, 30)]);
    const test1 = gildedRose.updateQuality();
    expect(test1[0].quality).toBe(31);
    const test2 = gildedRose.updateQuality();
    expect(test2[0].quality).toBe(33);
  })

  it("Should update quality for ETC correctly, but not go over 50", function() {
    const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 6, 44)]);
    const test1 = gildedRose.updateQuality();
    expect(test1[0].quality).toBe(46);
    const test2 = gildedRose.updateQuality();
    expect(test2[0].quality).toBe(49);
    const test3 = gildedRose.updateQuality();
    expect(test3[0].quality).toBe(50);
  })
});
