const uploadBox=document.querySelector(".upload-box"),
previewImg=uploadBox.querySelector("img"),
fileInput=uploadBox.querySelector("input"),
widthInput=document.querySelector(".width input"),
heightInput=document.querySelector(".height input"),
ratioInput=document.querySelector(".ratio input"),
qualityInput=document.querySelector(".quality input"),
downloadBtn=document.querySelector(".download-btn");
let ImageRatio;
const loadFile = (e) => {
    const file = e.target.files[0]; //getting first user selected file from array
    if(!file) return; //return if user hasn't selected any file
    previewImg.src=URL.createObjectURL(file); // passing selected file url to preview img src
    previewImg.addEventListener("load", () => { // creating active state once img loaded
        widthInput.value = previewImg.naturalWidth;
        heightInput.value = previewImg.naturalHeight;
        ImageRatio = previewImg.naturalWidth / previewImg.naturalHeight;
        document.querySelector(".wrapper").classList.add("active");
    });
}
widthInput.addEventListener("keyup", () => {
    const height = ratioInput.checked ? widthInput.value / ImageRatio : heightInput.value;// getting height according to the ratio checkbox status
    heightInput.value = Math.floor(height);
});

heightInput.addEventListener("keyup",()=>{
    const width=ratioInput.checked ? heightInput.value * ImageRatio : widthInput.value; // getting width according to the ratio checkbox status
    widthInput.value=Math.floor(width);
});

const resizeAndDownload=()=>{
    const canvas=document.createElement("canvas");
    const a=document.createElement("a");
    const ctx=canvas.getContext("2d");
    // if quality checkbox is checked, pass 0.5 to imgQuality else pass 1.0
    // 1.0 is 100% quality where 0.5 is 50% of total. you can pass from 0.1 - 1.0
    const imgQuality = qualityInput.checked ? 0.5 : 1.0;
    // setting canvas height & width according to the input values
    canvas.width=widthInput.value;
    canvas.height=heightInput.value;
    // drawing user selected image onto the canvas
    ctx.drawImage(previewImg,0,0,canvas.width,canvas.height);
    a.href=canvas.toDataURL("image/jpeg", imgQuality); //passing canvas data url as href value of a tag element
    a.download=new Date().getTime();
    a.click();//clicking <a> element so the file download
}
downloadBtn.addEventListener("click", resizeAndDownload);
fileInput.addEventListener("change", loadFile);
uploadBox.addEventListener("click", () => fileInput.click());