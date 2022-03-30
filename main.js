var song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
score_leftWrist = 0;
score_rightWrist = 0;


function setup() {
    canvas = createCanvas(600, 500);
    canvas.center()
    video = createCapture(VIDEO);
    video.hide()
    PoseNet = ml5.poseNet(video, modelLoaded);
    PoseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("PoseNet ready");
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");
    if (score_rightWrist > 0.2) {
        circle(rightWristX, rightWristY, 15);
        if (rightWristY > 0 && rightWristY <= 100) {
            document.getElementById("speed_text").innerHTML = "Speed = 0.5x"
            song.rate(0.5);
        } else if (rightWristY > 100 && rightWristY <= 200) {
            document.getElementById("speed_text").innerHTML = "Speed = 1x"
            song.rate(1);
        } else if (rightWristY > 200 && rightWristY <= 300) {
            document.getElementById("speed_text").innerHTML = "Speed = 1.5x"
            song.rate(1.5);
        } else if (rightWristY > 300 && rightWristY <= 400) {
            document.getElementById("speed_text").innerHTML = "Speed = 2x"
            song.rate(2);
        } else if (rightWristY > 400 && rightWristY <= 500) {
            document.getElementById("speed_text").innerHTML = "Speed = 2.5x"
            song.rate(2.5);
        }
    }
    if (score_leftWrist > 0.2) {
        circle(leftWristX, leftWristY, 15);
        InNumberLeftWristY = Number(leftWristY);
        removedecimals = floor(InNumberLeftWristY);
        volume = removedecimals / 500;
        document.getElementById("volume_text").innerHTML = "Volume: " + volume;
        song.setVolume(volume);
    }
}

function preload() {
    song = loadSound("Vivaldi-The-Four-Seasons-Op.-8-Download-free-sheet-music.mp3");
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function stop() {
    song.pause();
}

function restart() {
    song.stop();
    song.play();
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        score_leftWrist = results[0].pose.keypoints[9].score;
        score_rightWrist = results[0].pose.keypoints[10].score;
        console.log("Score Left Wrist=" + score_leftWrist);
        console.log("Score Right Wrist=" + score_rightWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left wrist X is:" + leftWristX + " and Left wrist Y is:" + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right wrist X is:" + rightWristX + " and Right wrist Y is:" + rightWristY);

    }
}