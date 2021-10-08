import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Pdf() {
  const printDocument = () => {
    const input = document.getElementById("divToPrint");
    html2canvas(input).then((canvas) => {
      let imgWidth = 208;
      let imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgData = canvas.toDataURL("img/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("download.pdf");
    });
  };
  return (
    <div>
      <div id="divToPrint" className="mt4">
        <div>Hellooooooo dud</div> <div></div>
        <div className="mb5">
          <button onClick={printDocument}>Print</button>
        </div>
      </div>
    </div>
  );
}
