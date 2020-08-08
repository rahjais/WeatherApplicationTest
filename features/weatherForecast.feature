Feature: Display the 5 day weather forecast for the given location

  Scenario Outline: To verify 5 days weather forecast is displayed for the entered city

    Given I launch the weather forecast page
    When I enter the <cityname>
    Then I should see the weather forecast data for five days

    Examples:
    | cityname  |
    | aberdeen  |
    | dundee    |
    | edinburgh |
    | glasgow   |
    | perth     |
    | stirling  |

  Scenario Outline: To verify only 5 days weather forecast is displayed for the entered city

    Given I launch the weather forecast page
    When I enter the <cityname>
    Then I should not see the weather forecast data for more than <numberOfDays> days

    Examples:
    | cityname  | numberOfDays |
    | aberdeen  |    5         |
    | dundee    |    5         |
    | edinburgh |    5         |
    | glasgow   |    5         |
    | perth     |    5         |
    | stirling  |    5         |


Scenario Outline: To verify the application displays 3 hourly forecast on selecting a day

    Given I launch the weather forecast page
    When I enter the <cityname>
    Then I should see the weather forecast data for five days
    When I select <day>
    Then I should be able to see 3 hourly forecast for that <day>

    Examples:
    | cityname    | day |
    | aberdeen    |  5  |
    | dundee      |  1  |
    | edinburgh   |  3  |
    | glasgow     |  4  |
    | perth       |  5  |
    | stirling    |  2  |

Scenario Outline: To verify the application hides the 3 hourly forecast on selecting the same day again

  Given I launch the weather forecast page
  When I enter the <cityname>
  Then I should see the weather forecast data for five days
  When I select <day>
  Then I should be able to see 3 hourly forecast for that <day>
  When I select <day>
  Then I should not be able to see 3 hourly forecast for that day

  Examples:
  | cityname  | day |
  | aberdeen  |  1  |

Scenario Outline:  To verify the application is showing the 3 hour data for daily forecast of current weather condition

  Given I launch the weather forecast page
  When I enter the <cityname>
  Then I should see the weather forecast data for five days
  When I select <day>
  Then I should be able to see 3 hourly forecast for that <day>
  And I should see the summarized view of current weather condition of the <day>

  Examples:
    | cityname    | day |
    | aberdeen    |  5  |
    | dundee      |  1  |
    | edinburgh   |  3  |
    | glasgow     |  4  |
    | perth       |  5  |
    | stirling    |  1  |

Scenario Outline:  To verify the application is showing the 3 hour data for daily forecast of wind speed.

  Given I launch the weather forecast page
  When I enter the <cityname>
  Then I should see the weather forecast data for five days
  When I select <day>
  Then I should be able to see 3 hourly forecast for that <day>
  And I should see the current wind speed of the <day>

  Examples:
    | cityname    | day |
    | aberdeen    |  4  |
    | dundee      |  1  |
    | edinburgh   |  1  |
    | glasgow     |  1  |
    | stirling    |  1  |


Scenario Outline:  To verify the application is showing the 3 hour data for aggregate rainfall.

  Given I launch the weather forecast page
  When I enter the <cityname>
  Then I should see the weather forecast data for five days
  When I select <day>
  Then I should be able to see 3 hourly forecast for that <day>
  Then I should see the summarized view of Aggregate rainfall of the <day>

  Examples:
    | cityname    | day |
    | aberdeen    |  5  |
    | dundee      |  1  |
    | edinburgh   |  3  |
    | glasgow     |  4  |
    | perth       |  5  |
    | stirling    |  2  |


  Scenario Outline:  To verify the application is showing the 3 hour data for min and max temperatures of the day.

    Given I launch the weather forecast page
    When I enter the <cityname>
    Then I should see the weather forecast data for five days
    When I select <day>
    Then I should be able to see 3 hourly forecast for that <day>
    And I should see the minimum and maximum temperature of the <day>

    Examples:
      | cityname    | day |
      | aberdeen    |  5  |
      | dundee      |  1  |
      | edinburgh   |  3  |
      | glasgow     |  4  |
      | perth       |  5  |
      | stirling    |  2  |


Scenario Outline:  To verify all the values displayed on the application are rounded off to the nearest value

  Given I launch the weather forecast page
  When I enter the <cityname>
  Then I should see the weather forecast data for five days
  Then I should be able to see all values are rounded off

  Examples:
    | cityname  |
    | aberdeen  |
    | dundee    |
    | edinburgh |
    | glasgow   |
    | perth     |
    | stirling  |

Scenario Outline:  To verify the error message is displayed if city entered is incorrect

  Given I launch the weather forecast page
  When I enter the <cityname>
  Then I should see the error message as <error message>

  Examples:
  | cityname  |error message|
  | London    |Error retrieving the forecast|
