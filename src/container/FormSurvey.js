import { useCallback } from "react";
import "survey-core/modern.min.css";
// import 'survey-core/survey.min.css';
import { StylesManager, Model } from "survey-core";
import { Survey } from "survey-react-ui";

export default function FormSurvey() {
  StylesManager.applyTheme("modern");

  const surveyJson = {
    pages: [
      {
        name: "page1",
        navigationTitle: "Collector",
        navigationDescription: "Collector's info",
        elements: [
          {
            type: "image",
            name: "first_page_image",
            imageLink:
              "https://egerie-software.com/wp-content/themes/egerie/img/egerie-logo.svg"
          },
          {
            type: "panel",
            name: "unique_case_id_textbox",
            elements: [
              {
                type: "panel",
                name: "identity",
                title: "Identidy".toLocaleUpperCase(),
                showNumber: true,
                elements: [
                  {
                    type: "text",
                    name: "age",
                    startWithNewLine: false,
                    title: "Age",
                    inputType: "number",
                    hideNumber: true,
                    isRequired: true
                  },
                  {
                    type: "boolean",
                    name: "identity",
                    titleLocation: "hidden",
                    labelTrue: "Mr.",
                    labelFalse: "Mrs.",
                    hideNumber: true,
                    isRequired: true
                  }
                ]
              },
              {
                type: "panel",
                name: "data_collector_information",
                elements: [
                  {
                    type: "text",
                    name: "name_of_data_collector",
                    title: "Name of data collector"
                  },
                  {
                    type: "text",
                    name: "data_collector_institution",
                    title: "Data collector Institution"
                  },
                  {
                    type: "text",
                    name: "data_collector_telephone_number",
                    title: "Data collector telephone number",
                    inputType: "tel"
                  },
                  {
                    type: "text",
                    name: "email",
                    title: "Email",
                    inputType: "email"
                  },
                  {
                    type: "text",
                    name: "form_completion_date",
                    title: "Form completion date",
                    inputType: "date"
                  }
                ],
                title: "Data Collector Information",
                showNumber: true,
                showQuestionNumbers: "off"
              }
            ]
          }
        ]
      },
      {
        name: "page2",
        navigationTitle: "Collector2",
        navigationDescription: "Collector's info2",
        elements: [
          {
            type: "rating",
            name: "nps_score",
            title:
              "On a scale of zero to ten, how likely are you to recommend our product to a friend or colleague?",
            isRequired: true,
            rateMin: 0,
            rateMax: 10,
            minRateDescription: "(Most unlikely)",
            maxRateDescription: "(Most likely)"
          },
          {
            type: "checkbox",
            name: "promoter_features2",
            visible: false,
            visibleIf: "{nps_score} >= 9",
            title: "Which features do you value the most?",
            isRequired: true,
            validators: [
              {
                type: "answercount",
                text: "Please select two features maximum.",
                maxCount: 2
              }
            ],
            choices: [
              "Performance",
              "Stability",
              "User Interface",
              "Complete Functionality"
            ],
            hasOther: true,
            otherText: "Other feature:",
            colCount: 2
          },
          {
            type: "comment",
            name: "passive_experience",
            visible: false,
            visibleIf: "{nps_score} > 6  and {nps_score} < 9",
            title: "What do you like about our product?"
          },
          {
            type: "comment",
            name: "disappointed_experience",
            visible: false,
            visibleIf: "{nps_score} notempty",
            title:
              "What do you miss or find disappointing in your experience with our products?"
          }
        ]
      }
    ],
    showProgressBar: "top",
    progressBarType: "buttons"
  };

  const survey = new Model(surveyJson);
  survey.focusFirstQuestionAutomatic = false;

  const alertResults = useCallback((sender) => {
    const results = JSON.stringify(sender.data);
    alert(results);
  }, []);

  survey.onComplete.add(alertResults);

  return <Survey model={survey} />;
}
