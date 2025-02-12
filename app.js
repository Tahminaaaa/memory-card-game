const words = {
    glücklich: ['fröhlich'],
    traurig: ['unglücklich'],
    schnell: ['rasant'],
    langsam: ['gemächlich'],
    schön: ['hübsch'],
    hässlich: ['unattraktiv']
};


let allWords = [];

for (let key in words) {
    allWords.push(key);
    allWords.push(...words[key]);
}

allWords.sort(() => Math.random() - 0.5);

const boxes = document.querySelectorAll(".box")

boxes.forEach((box, index) => {
    const card = box.querySelector(".card");
    card.innerHTML = `
            <div class="front"><img src="question mark.jpg" alt="questionmark" style="height: 100px; width:100px;"></div>
            <div class="back" style="font-size: 15px;" >${allWords[index]}</div>
    `;
    box.addEventListener("click", function () {
        this.classList.toggle("flip");
    });
});

