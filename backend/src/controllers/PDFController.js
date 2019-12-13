var fs = require('fs');
var PDFDocument = require('pdfkit');
module.exports = {
  async generate(req, res) {
    const lorem =
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem voluptate vero ab molestias omnis aliquam dignissimos consequuntur molestiae praesentium quo soluta, magni ea aliquid exercitationem! Dolores quasi voluptatibus esse natus sapiente saepe ratione neque mollitia.\n am est iste aspernatur ipsa, hic quas at officia facilis obcaecati voluptatum? Qui voluptatum accusamus distinctio sed in maiores aliquid error libero numquam id quaerat dolore quod sequi fugit nihil cum, illo hic molestias incidunt expedita facilis corporis? Aliquid, debitis porro illum adipisci error quisquam doloremque, ullam, corrupti deserunt quaerat obcaecati earum commodi doloribus quas perspiciatis. Repellat repellendus fugit accusantium doloremque expedita nihil ea temporibus. Nemo cumque ratione et aliquam impedit reiciendis? Aliquam autem voluptas asperiores cumque odit itaque magni quisquam illo expedita repudiandae voluptate eos sapiente saepe cupiditate, explicabo dolorum doloremque animi, reiciendis magnam illum consequuntur recusandae. Temporibus, rem ipsum dicta magni itaque ab hic facilis corporis quisquam sed soluta dolorem, error voluptatum vitae! Nobis tempore quae modi eveniet repellendus harum quos eligendi voluptatibus rerum dolorum officia consequatur facere officiis fuga quas quidem, possimus mollitia delectus tempora magni atque pariatur voluptates! Culpa nulla repellat assumenda sed facilis nihil, deleniti aliquid laborum ullam? Reiciendis ullam numquam sunt dicta unde consectetur magni repellat quisquam vel consequatur, aliquam amet eaque dignissimos? Totam velit voluptas neque illum facilis iusto non debitis tempora, fugiat ipsum rerum. Iusto, a, explicabo maxime, autem unde officiis excepturi esse ipsum doloribus temporibus architecto est! Labore, explicabo? Hic quisquam eum fugit adipisci, molestias modi cumque fugiat nemo facilis vel eos ratione ipsum rem, quasi voluptatibus. Enim, molestiae. Fugiat consectetur aliquam tempore, placeat porro tenetur explicabo? Expedita eos aspernatur iusto, dignissimos sit tempora atque corporis illo numquam at id provident inventore porro error perspiciatis accusamus unde, nihil pariatur aut enim vero perferendis voluptate hic? Odio veniam, adipisci, beatae debitis laborum accusamus similique vero laudantium et rerum sapiente earum. Fugiat, voluptatem. Quidem dolore error vel voluptate, sed numquam quibusdam, velit molestiae unde laudantium laborum consequatur amet fugiat aliquam! Veritatis, eaque molestiae ut fugit laborum ab aperiam maiores odit nisi modi harum esse quae atque. Quisquam reiciendis corrupti aperiam modi exercitationem non corporis quia ab, facere porro iure minus, hic illum. Labore, fugit reprehenderit? Temporibus eum repellendus magnam officia dolor neque iure sed fugit, velit consectetur, exercitationem illo nesciunt assumenda unde pariatur ullam, voluptatem labore? Eaque minima deleniti, ab rem expedita alias? Voluptate unde similique ad, est amet nostrum, laborum quis ut molestiae cum dolor sed, molestias eius tempora nam. Nostrum, a ad! Vitae cumque ipsum tenetur voluptates, dolorem excepturi, soluta porro quis ad sapiente quaerat, nihil architecto temporibus repudiandae officia. Dignissimos sequi porro sed perferendis, minus ex deleniti animi minima, dolorem officiis, quis temporibus vel autem ducimus. Id ut nisi ea! A modi aut rerum enim. Nemo aspernatur temporibus, illum doloribus ducimus, laudantium ratione, nisi officiis nesciunt dolores tempore laborum. Temporibus tempora doloremque, ratione atque consequuntur sed libero earum nihil sint accusantium natus facere ullam assumenda aliquid quas saepe quos non magnam reprehenderit ducimus. Fugiat, quod minus accusantium incidunt eveniet nihil placeat natus enim delectus sed.';
    const doc = new PDFDocument({ bufferPages: true });

    let buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      let pdfData = Buffer.concat(buffers);
      res
        .writeHead(200, {
          'Content-Length': Buffer.byteLength(pdfData),
          'Content-Type': 'application/pdf',
          'Content-disposition': 'attachment;filename=edef-13-12-2019.pdf'
        })
        .end(pdfData);
    });

    //doc.pipe(fs.createWriteStream('output.pdf'));

    doc
      .fillColor('#000')
      .fontSize(16)
      .text('Universidade Federal do Amapá', {
        align: 'center'
      })
      .moveDown(1);
    doc.fontSize(12);

    doc.text(lorem, {
      columns: 2,
      columnGap: 15,
      align: 'justify'
    });

    // doc.pipe(fs.createWriteStream('file.pdf')).on('finish', function() {
    //   return res.json({ finished: true });
    // });

    doc.end();
  }
};
