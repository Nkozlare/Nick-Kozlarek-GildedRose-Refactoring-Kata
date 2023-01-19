const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {
  it("should foo", function() {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });

  //-------------------- Testing Adding to the shop -------------------------

  it("Should add a firey hammer to the shop", () => {
    const gildedRose = new Shop([new Item('Sulfuras, Hand of Ragnaros', 30, 80)]);
    expect(gildedRose.items[0].name).toBe("Sulfuras, Hand of Ragnaros");
  });

  it("Should add a pass to the Elite Tauren Chieftan concert to the shop", () => {
    const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 11, 30)]);
    expect(gildedRose.items[0].name).toBe('Backstage passes to a TAFKAL80ETC concert');
  });

  it("Should add any item to the shop that isn't in the given list", () => {
    const gildedRose = new Shop([new Item('Corrupted Ashbringer', 11, 50)])
    expect(gildedRose.items[0].name).toBe('Corrupted Ashbringer');
  });


  //-------------------- Testing changing of quality -------------------------


  // Sulfuras

  it("Should not change the quality of Sulfuras at any point", () => {
    const gildedRose = new Shop([new Item('Sulfuras, Hand of Ragnaros', 1, 80)]);
    const test1 = gildedRose.updateQuality();
    expect(test1[0].quality).toBe(80);
    const test2 = gildedRose.updateQuality();
    expect(test2[0].quality).toBe(80);
    const test3 = gildedRose.updateQuality();
    expect(test3[0].quality).toBe(80);
  });

  // Aged Brie

  it("Should add one quality per updateQuality to Aged Brie", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 5, 30)]);
    const test1 = gildedRose.updateQuality();
    expect(test1[0].quality).toBe(31);
  });

  it("Aged Brie quality should not exceed 50", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 5, 50)]);
    const test1 = gildedRose.updateQuality();
    expect(test1[0].quality).toBe(50);
  });

  // Elite Tauren Chieftan Backstage Pass

  it("Should add one quality per updateQuality if the sellIn is above 10", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 15, 30)]);
    const test1 = gildedRose.updateQuality();
    expect(test1[0].quality).toBe(31);
  });

  it("Should add two quality per updateQuality if the sellIn is between 10 and 5", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 7, 30)]);
    const test1 = gildedRose.updateQuality();
    expect(test1[0].quality).toBe(32);
  });

  it("Should add three quality per updateQuality if the sellIn is between 5 and 0", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 2, 30)]);
    const test1 = gildedRose.updateQuality();
    expect(test1[0].quality).toBe(33);
  });

  it("ETC pass should never exceed 50 quality", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 2, 50)]);
    const test1 = gildedRose.updateQuality();
    expect(test1[0].quality).not.toBeGreaterThan(50);
  });

  it("ETC pass should have quality of 0 when sellIn is below 0", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", -1, 50)]);
    const test1 = gildedRose.updateQuality();
    expect(test1[0].quality).toBe(0);
  });

  // Conjured Items

  it("Conjured Items should decay at a rate of 2 per update when sellIn is above or equal to 0", () => {
    const gildedRose = new Shop([new Item("Conjured", 12, 50)]);
    const test1 = gildedRose.updateQuality();
    expect(test1[0].quality).toBe(48);
  });

  it("Conjured Items should decay at a rate of 4 per update when sellIn is below 0", () => {
    const gildedRose = new Shop([new Item("Conjured", -1, 12)]);
    const test1 = gildedRose.updateQuality();
    expect(test1[0].quality).toBe(8);
  });

  it("Conjured Items should never decay beneath 0", () => {
    const gildedRose = new Shop([new Item("Conjured", -1, 2)]);
    const test1 = gildedRose.updateQuality();
    expect(test1[0].quality).not.toBeLessThan(0);
  });

  // Every Other Item

  it("All other items should decay at a rate of 1 per update when sellIn is above or equal to 0", () => {
    const gildedRose = new Shop([new Item("Medallion of Honor", 12, 50)]);
    const test1 = gildedRose.updateQuality();
    expect(test1[0].quality).toBe(49);
  });

  it("All other items should decay at a rate of 2 per update when sellIn is below 0", () => {
    const gildedRose = new Shop([new Item("Medallion of Honor", -1, 50)]);
    const test1 = gildedRose.updateQuality();
    expect(test1[0].quality).toBe(48);
  });

  it("All other items should not decay below 0", () => {
    const gildedRose = new Shop([new Item("Medallion of Honor", -1, 0)]);
    const test1 = gildedRose.updateQuality();
    expect(test1[0].quality).not.toBeLessThan(0);
  });

  //-------------------- Testing change of sellIn -------------------------

  it("Should change the sellIn by -1 each update for every item except Sulfuras", () => {
    const gildedRose = new Shop([
      new Item("Medallion of Honor", 4, 0), 
      new Item("Conjured", -1, 2), 
      new Item("Backstage passes to a TAFKAL80ETC concert", 12, 50),
      new Item("Aged Brie", 5, 30),
      new Item("Sulfuras, Hand of Ragnaros", 1, 80)]
    )
    const test1 = gildedRose.updateQuality();
    expect(test1[0].sellIn).toBe(3);
    expect(test1[1].sellIn).toBe(-2);
    expect(test1[2].sellIn).toBe(11);
    expect(test1[3].sellIn).toBe(4);
    expect(test1[4].sellIn).toBe(1);
  })
});
