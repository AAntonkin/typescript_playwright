@api
Feature: Test task to verify API


   Scenario: User able to get list of cars from server
      Given Server is upp and running
      When User send GET request with "<Car Type>" type
      Then Server respose with <Response> code
      And Server respose have list of such fields and values:
         | Field Name  | Field Value |
         | make        | <not_empty> |
         | model       | <not_empty> |
         | year        | <not_empty> |
         | type        | <Car Type>  |
         | zeroToSixty | <not_empty> |
         | price       | <not_empty> |

      Examples:
         | Car Type  | Response |
         | Saloon    | 200      |
         | Suv       | 200      |
         | Hatchback | 200      |

   Scenario: User get 404 when try to get unexisting car
      Given Server is upp and running
      When User send GET request with "Buli back" type
      Then Server respose with 404 code



