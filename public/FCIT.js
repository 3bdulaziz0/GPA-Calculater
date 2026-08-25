const path = window.location.pathname;

if (path == "/FCIT") {
    document.title = "FCIT Calculator"
    
    const cards = document.getElementById('cards');
    cards.classList.add("disabled-cards");
    courses = [
        {
            name: "CPCS-202",
            score: "",
            credit: "3",
            gradeIndex: getGradeAndPoints(this.score).grade,
            points: 0
        },
        {
            name: "CPIT-201",
            score: "",
            credit: "3",
            gradeIndex: getGradeAndPoints(this.score).grade,
            points: 0
        },
        {
            name: "STAT-210",
            score: "",
            credit: "3",
            gradeIndex: getGradeAndPoints(this.score).grade,
            points: 0
        },
        {
            name: "CPIT-221",
            score: "",
            credit: "2",
            gradeIndex: getGradeAndPoints(this.score).grade,
            points: 0
        }
    ];
    
    system = "100";
    document.getElementById("radio-system100").checked = true;
    inpCredits.disabled = true;
    inpGPA.disabled = true;
    cumulative.disabled = true;

    document.getElementById('T1').innerHTML = `

        <!-- FCIT Table -->
         <div class="FCIT-table" id="FCIT-table" style="">
        <table class="table table-bordered no-flex" style="width: 50vw; text-align:center;">
            <thead class="table-secondary">
            <tr>
                <th scope="col">أقل موزونة قُبلت بالتخصص</th>
                <th scope="col">CS</th>
                <th scope="col">IT</th>
                <th scope="col">IS</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>25</td>
                <td>
                <div class="block-container">
                    <div class="block boys">?</div>
                    <div class="block girls">?</div>
                </div>
                </td>
                <td>
                <div class="block-container">
                    <div class="block boys">?</div>
                    <div class="block girls">?</div>
                </div>
                </td>
                <td>
                <div class="block-container">
                    <div class="block boys">?</div>
                    <div class="block girls">?</div>
                </div>
                </td>
            </tr>

            <tr>
                <td>24</td>
                <td>
                <div class="block-container">
                    <div class="block boys">90.24</div>
                    <div class="block girls">93.82</div>
                </div>
                </td>
                <td>
                <div class="block-container">
                    <div class="block boys">83.2</div>
                    <div class="block girls">88</div>
                </div>
                </td>
                <td>
                <div class="block-container">
                    <div class="block boys">71.18</div>
                    <div class="block girls">88></div>
                </div>
                </td>
            </tr>

            <tr>
                <td>23.5</td>
                <td>
                <div class="block-container">
                    <div class="block boys">90</div>
                    <div class="block girls">97.5</div>
                </div>
                </td>
                <td>
                <div class="block-container">
                    <div class="block boys">83</div>
                    <div class="block girls">92.7</div>
                </div>
                </td>
                <td>
                <div class="block-container">
                    <div class="block boys">83></div>
                    <div class="block girls">72.18</div>
                </div>
                </td>
            </tr>

            <tr>
                <td>23</td>
                <td>
                <div class="block-container">
                    <div class="block boys">90</div>
                    <div class="block girls">94.81</div>
                </div>
                </td>
                <td>
                <div class="block-container">
                    <div class="block boys">83</div>
                    <div class="block girls">91</div>
                </div>
                </td>
                <td>
                <div class="block-container">
                    <div class="block boys">83></div>
                    <div class="block girls">91></div>
                </div>
                </td>
            </tr>

            <tr>
                <td>22</td>
                <td>
                <div class="block-container">
                    <div class="block boys">88.89</div>
                    <div class="block girls">89</div>
                </div>
                </td>
                <td>
                <div class="block-container">
                    <div class="block boys">85</div>
                    <div class="block girls">88</div>
                </div>
                </td>
                <td>
                <div class="block-container">
                    <div class="block boys">73.6</div>
                    <div class="block girls">88></div>
                </div>
                </td>
            </tr>

            </tbody>
        </table>
        </div>
        <!-- FCIT Table -->
    
    `

    setupUI();

    for (let i = 1; i <= courses.length; i++) {
        document.getElementById(`course${i}-name`).disabled = true;
        document.getElementById(`course${i}-credit`).disabled = true;
        document.getElementById(`course${i}-delete`).classList.add("disabled-cards");
    } 
    document.getElementById('add-btn').disabled = true;

    
    
}