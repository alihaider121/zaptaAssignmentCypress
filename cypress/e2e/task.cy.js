describe("e2e-feature listing - midland appartments", () => {
  it("Verify the text of the stay and the Amenities sections", () => {
    //visit page
    cy.visit("https://stg.zaptatech.com/");
    //scroll and click Midland Appartments
    cy.get("#featured").scrollIntoView({ easing: "linear" });
    cy.get(".swiper-slide-next > a > .feature-card > .img-fluid").click({
      force: true,
    });
    //assertions
    cy.url().should("include", "/property/2");
    var stays = ["2 Bedrooms", "4 Guests", "2 Bath"];
    var ammenities = ["Wifi", "Work Area", "Full Kitchen"];
    AssertArrayElement(0,stays);
    AssertArrayElement(1,ammenities)
    //date formatting 
     const dayjs = require("dayjs");
    const now = dayjs();
    const timestamp = now.format("HH-mm-ss");
    //saving screenshots
    cy.screenshot(`FIRST_${timestamp}`);
  });
});

function AssertArrayElement(nthChild,array)
{
  cy.get(".offers-container")
  .eq(nthChild)
  .children(0)
  .should("have.length", 3)
  .then(($els) => {
    // we get a list of jQuery elements
    // let's convert the jQuery object into a plain array
    return (
      Cypress.$.makeArray($els)
        // and extract inner text from each
        .map((el) => el.innerText)
    );
  })
  .should("deep.equal", array); 
}