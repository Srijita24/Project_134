img = "";
status = "";
objects = [];

function  setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
    console.log('Model Loaded!');
    status = true;
    
}

function gotresult(error, results) {
    if (error)
    {
        console.error(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}

function preload() {
    song = loadSound("alert_sound.mp3");
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function draw() {
    image(video, 0, 0, 380, 380);

    if (status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotresult);
        for (i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Objects Detected!";
            fill(r,g,b);
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
        if (objects[i].label = "person")
        {
            document.getElementById("found_or_not").innerHTML = "Baby Detected!";
            song.stop();
        }
        else {
            document.getElementById("found_or_not").innerHTML = "Baby Not Detected!";
            song.play();
        }
        if(objects[i].length < 0)
        {
            document.getElementById("found_or_not").innerHTML = "Baby Not Detected!";
            song.play();
        }
    }
}