@ui
Feature: Test task to verify UI site

    Background: Navigation
        Given User opens test site

    Scenario: User able to navigate through site
        When User selects "Books" category
        And User selects "Audio CD" sub-category
        And User selects "New French With Ease" product
        Then User see opened "New French With Ease" product details:
            | Price  | Rate | Full Name                                |
            | $85.00 | 5    | New French With Ease (1 book + 1 mp3 CD) |


    Scenario: User able to buy product
        When User open product page:
            | Category              | SubCategory | Product                            |
            | Apparel & Accessories | T-Shirts    | Casual 3/4 Sleeve Baseball T-Shirt |
        And Remember price
        And User adds "2" products to cart
        Then User verify product in cart