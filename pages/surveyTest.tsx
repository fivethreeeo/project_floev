import React from 'react'
import * as Survey from "survey-react";

const surveyJSON = {
    title: "Tell us, what technologies do you use?", pages: [
        {
            name: "page1", questions: [
                { type: "radiogroup", choices: ["Yes", "No"], isRequired: true, name: "frameworkUsing", title: "Do you use any front-end framework like Bootstrap?" },
                { type: "checkbox", choices: ["Bootstrap", "Foundation"], hasOther: true, isRequired: true, name: "framework", title: "What front-end framework do you use?", visibleIf: "{frameworkUsing} = 'Yes'" }
            ]
        },
        {
            name: "page2", questions: [
                { type: "radiogroup", choices: ["Yes", "No"], isRequired: true, name: "mvvmUsing", title: "Do you use any MVVM framework?" },
                { type: "checkbox", choices: ["AngularJS", "KnockoutJS", "React"], hasOther: true, isRequired: true, name: "mvvm", title: "What MVVM framework do you use?", visibleIf: "{mvvmUsing} = 'Yes'" }]
        },
        {
            name: "page3", questions: [
                { type: "comment", name: "about", title: "Please tell us about your main requirements for Survey library" }]
        }
    ]
}

const SurveyTest = () => {
    let model = new Survey.Model(surveyJSON);

    function onValueChanged(result: any) {
        console.log("value changed!" + JSON.stringify(result.data))
    }

    function onComplete(result: any) {
        console.log("Complete! " + JSON.stringify(result));
    }

    function onCurrentPageChanged(result: any) {
        // console.log("onCurrentPageChanged! " + JSON.stringify(result.data));
    }

    return <>
        <div>
            <h2>SurveyJS Library - a sample survey below</h2>
            {/* <Survey.Survey
                json={surveyJSON}
                onComplete={onComplete}
                onValueChanged={onValueChanged}
            /> */}
            <Survey.Survey
                model={model}
                onComplete={onComplete}
                onValueChanged={onValueChanged}
                onCurrentPageChanged={onCurrentPageChanged}
            />
        </div>
    </>
}

export default SurveyTest