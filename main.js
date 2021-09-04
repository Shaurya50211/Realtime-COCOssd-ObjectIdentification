Status = "";
Objects = [];

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    Object_Detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Dectecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded!");
    Status = true;
}

function draw() {
    image(video, 0, 0, 380, 380);
    if (Status != "") {
        Red = random(255);
        Green = random(255);
        Blue = random(255);
        Object_Detector.detect(video, gotResult);
        document.getElementById("NumOfObjects").innerHTML = "Number of Objects Detected: " + Objects.length;
        for (i = 0; i < Objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            textSize(20);
            fill(Red, Green, Blue);
            Percentage = floor(Objects[i].confidence * 100);
            text(Objects[i].label + " " + Percentage + "%", Objects[i].x + 10, Objects[i].y + 30);
            noFill();
            stroke(Red, Green, Blue);
            rect(Objects[i].x, Objects[i].y, Objects[i].width, Objects[i].height);
        }
    }
}

function gotResult(error, results) {
    if (error) {
        console.error;
    } else {
        Objects = results;
        console.log(results);
    }
}