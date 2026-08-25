
const systems = document.querySelectorAll('input[name="radio-system"]');

let system = "5";

  systems.forEach(choice => {
    choice.addEventListener("change", c => {
      system = c.target.value;
      setupUI();
      
      
    });
  });

const PreviousGPA = document.querySelectorAll('input[name="radio-previous"]');

const inpCredits = document.getElementById("previous-credits");
const inpGPA = document.getElementById("inp-GPA");
const inpPoints = document.getElementById("inp-points");


let previous = "radio-GPA";

  PreviousGPA.forEach(choice => {
    choice.addEventListener("change", () => {
        
        switch (choice.id) {
            case "radio-GPA":
                inpGPA.disabled = false;
                inpPoints.disabled = true;
                previous = choice.id;
                break;
            case "radio-points":
                inpPoints.disabled = false;
                inpGPA.disabled = true;
                previous = choice.id;
                
                break;
        
            default:
                console.log("unknown choice!");
                
                break;
        }
        
    })
    
  })

let previousPoints = 0;
let previousCredits = 0;

function prev() {
    let credits = inpCredits.value;
    let GPA = inpGPA.value;
    const points = inpPoints.value;

    if (credits == '') {
        credits = 0;
    }
    
    switch (previous) {
        case "radio-GPA":
            previousPoints = formatNumber(Number(GPA) * Number(credits));
            inpPoints.value = previousPoints;
            
            break;
        case "radio-points":
            if (Number(credits) != 0) {
                GPA = inpGPA.value = formatNumber(Number(points) / Number(credits));
                previousPoints = formatNumber(inpGPA.value * credits);
            }
            
            break;
    
        default:
            break;
    }    

    previousCredits = credits;
    calc();
    
}




const cumulative = document.getElementById("cumulative");
let isChecked = cumulative.checked;

    cumulative.addEventListener("change", () => {
        const resultsHeader = document.getElementById("results-header");
        isChecked = cumulative.checked;
        if (isChecked) {
            resultsHeader.innerHTML = "نتائج التراكمي";
            calc(previousCredits, previousPoints)
        } else {
            resultsHeader.innerHTML = "نتائج الفصل";
            calc();
        }
        
    })




function formatNumber(number) {
    let rounded = Math.round(number * 1000) / 1000;
    if (Number.isInteger(rounded)) {
        return rounded;
    }
    return rounded;
}








/////////////////////////





let courses = [
    {
        name: "course 1",
        score: "",
        credit: "",
        gradeIndex: getGradeAndPoints(this.score).grade,
        points: 0
    }
    // {
    //     name: "course 1",
    //     score: 88,
    //     credit: 3,
    //     gradeIndex: getGradeAndPoints(this.score).grade,
    //     points: 0
    // }
]

function getCoursesFromStorage() {
        let retrievedcourses = JSON.parse(localStorage.getItem("courses"));

        courses = retrievedcourses ?? [];
    }

    getCoursesFromStorage();

    setupUI();

// name,    score,  credit,  gradeIndex,    points


function setupUI() {
    let table = document.getElementById("courses");
    table.innerHTML = "";
    let courseIndex = 1;
    for (let course of courses) {

        table.innerHTML += `
            <tr class="course-row" id="course${courseIndex}">
                <td class="course name-column course-name">
                    <input type="text" value="${course.name}" id="course${courseIndex}-name" oninput="editCourse('name', this.value, ${courseIndex-1});" style="width: 100%;">
                </td>
                <td class="course score-column">
                    <input type="text" value="${course.score}" oninput="this.value = this.value.replace(/[^0-9.,]/g, '').replace(/,/g, '.'); displayPoints(${courseIndex}); editCourse('score', this.value, ${courseIndex-1}); calc();" inputmode="decimal" id="course${courseIndex}-score" style="width: 100%;">
                </td>
                <td class="course credit-column course-credit">
                    <input type="text" value="${course.credit}" oninput="this.value = this.value.replace(/[^0-9]/g, ''); displayPoints(${courseIndex}); editCourse('credit', this.value, ${courseIndex-1}); calc();" inputmode="numeric" id="course${courseIndex}-credit" style="width: 100%;">
                </td>
                <td class="course grade-column">
                    <select id="course${courseIndex}-grades" onchange="document.getElementById('course${courseIndex}-score').value = getScore(this.selectedIndex); displayPoints(${courseIndex}); editCourse('grade', this.selectedIndex, ${courseIndex-1}); calc();"> 
                        <option value="-">-</option>
                        <option value="A+">A+</option>
                        <option value="A">A</option>
                        <option value="B+">B+</option>
                        <option value="B">B</option>
                        <option value="C+">C+</option>
                        <option value="C">C</option>
                        <option value="D+">D+</option>
                        <option value="D">D</option>
                        <option value="F">F</option>
                    </select>
                </td>
                <td class="course points-column">
                    <input type="text" id="course${courseIndex}-points" disabled style="width: 100%;">
                </td>
                <td class="course delete-column course-delete">
                    <span class="material-symbols-outlined" id="course${courseIndex}-delete" onclick="deleteCourse(${courseIndex-1})" style="display: flex; align-items: center; color: rgb(255, 2, 2); cursor: pointer;">
                        close
                    </span>
                </td>
            </tr>
        `;
        courseIndex++;
    }

    courseIndex = 1;
    for (let course of courses) {
        document.getElementById(`course${courseIndex}-grades`).selectedIndex = getGradeAndPoints(course.score).grade;
        displayPoints(courseIndex);
        course.points = getPoints(system, course.score, course.credit);
        courseIndex++;
        
    }

    calc();
    
    
}

function deleteCourse(index) {
    if (courses.length > 1) {
        courses.splice(index, 1);
        setupUI();
    }
}


function editCourse(key, value, index) {

    switch (key) {
        case "score":
            courses[index].score = value;
            courses[index].gradeIndex = getGradeAndPoints(value).grade;
            courses[index].points = getPoints(system, value, courses[index].credit);
            
            break;
        case "credit":
            courses[index].credit = value;
            courses[index].points = getPoints(system, courses[index].score, value);

            break;
        case "grade":
            courses[index].gradeIndex = value;
            courses[index].score = getScore(value);
            courses[index].points = getPoints(system, getScore(value), courses[index].credit);

            break;
        case "name":
            courses[index].name = value;

            break;
            
    
        default:
            break;
    }
    
    
    
    
}

function addCourse() {
    if (courses.length < 12) {
        courses.push(
            {
            name: "course " +( courses.length + 1),
            score: "",
            credit: "",
            gradeIndex: 0,
            points: 0
        }
      )
      setupUI();
        
    }
}


function displayPoints(courseNO) {

    
    let score = document.getElementById(`course${courseNO}-score`).value;
    let credit = document.getElementById(`course${courseNO}-credit`).value;
    document.getElementById(`course${courseNO}-grades`).selectedIndex = getGradeAndPoints(score).grade;


    let points = getPoints(system, score, credit);

    document.getElementById(`course${courseNO}-points`).value = points;
    

}

function getPoints(system, score, credit) {

    switch (system) {
        case "5":
            return (getGradeAndPoints(score).points5) * credit;
            break;
        case "4":
            return (getGradeAndPoints(score).points4) * credit;
            break;
        case "100":
            return (score * credit);
            break;

        default:
            break;
    }
    
}



function getGradeAndPoints(score) {
    if (score >= 95)
        return {grade: 1, points5: 5.0, points4: 4.0};
    else if (score >= 90)
        return {grade: 2, points5: 4.75, points4: 3.75};
    else if (score >= 85)
        return {grade: 3, points5: 4.5, points4: 3.5};
    else if (score >= 80)
        return {grade: 4, points5: 4.0, points4: 3.0};
    else if (score >= 75)
        return {grade: 5, points5: 3.5, points4: 2.5};
    else if (score >= 70)
        return {grade: 6, points5: 3.0, points4: 2.0};
    else if (score >= 65)
        return {grade: 7, points5: 2.5, points4: 1.5};
    else if (score >= 60)
        return {grade: 8, points5: 2.0, points4: 1.0};
    else if (score < 60 && score != "")
        return {grade: 9, points5: 1.0, points4: 0};
    else
        return {grade: 0, points5: 0, points4: 0};
}


function getScore(gradeIndex) {
    switch (gradeIndex) {
        case 0: return "";
        case 1: return 95;
        case 2: return 90;
        case 3: return 85;
        case 4: return 80;
        case 5: return 75;
        case 6: return 70;
        case 7: return 65;
        case 8: return 60;
        case 9: return 0;
    
        default:
            break;
    }
}

function getGradeName(GPA) {
    if (system == "5") {
        if (GPA >= 4.5) return "ممتاز"; // 3.5
        else if (GPA >= 4) return "جيد جدا"; // 3
        else if (GPA >= 3) return "جيد"; // 2
        else if (GPA >= 2) return "مقبول"; // 1
        return "";
    } else if (system == "4") {
        if (GPA >= 3.5) return "ممتاز";
        else if (GPA >= 3) return "جيد جدا";
        else if (GPA >= 2) return "جيد";
        else if (GPA >= 1) return "مقبول";
        return "";
    } else
        if (GPA >= 85) return "ممتاز";
        else if (GPA >= 80) return "جيد جدا";
        else if (GPA >= 70) return "جيد";
        else if (GPA >= 60) return "مقبول";
        return "";
    
}

function calc() {
    const displayPoints = document.getElementById("result-P");
    const displayCredits = document.getElementById("result-C");
    const displayGPA = document.getElementById("result-GPA");
    const displayGrade = document.getElementById("result-G");


    let totalPoints = 0;
    let totalcredits = 0;

    if (isChecked && previousCredits != 0) {
        totalPoints += Number(previousPoints);
        totalcredits += Number(previousCredits);
    }
    
    for (const course of courses) {
        totalcredits += Number(course.credit);
        totalPoints += Number(course.points);
    }
    let GPA = (totalPoints / totalcredits);
        if (Number.isNaN(GPA)) {
            GPA = '';
        }    
    

    displayPoints.innerHTML = formatNumber(totalPoints);
    displayCredits.innerHTML = totalcredits;
    displayGPA.innerHTML = formatNumber(GPA);
    displayGrade.innerHTML = getGradeName(GPA);


    localStorage.setItem("courses", JSON.stringify(courses));
    return formatNumber(GPA);
    
}

setupUI();







