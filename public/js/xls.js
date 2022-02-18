

function xlsToArray(e) {
  
    var file = $('#input').prop('files')[0]
    // input canceled, return
    if (!file) return;
    
    var FR = new FileReader();
    FR.onload = function(e) {
      var data = new Uint8Array(e.target.result);
      var workbook = XLSX.read(data, {type: 'array'});
      var firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      
      // header: 1 instructs xlsx to create an 'array of arrays'
      var result = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
      
      const counts = {};
      for(let i=1;i<result.length;i++)
      {
        counts[result[i][12]] = (counts[result[i][12]] || 0) + 1;
      }
    
      console.log(counts)
      
    //   var output = document.getElementById('result');
    //   output.innerHTML = JSON.stringify(result, null, 2);
    };
    FR.readAsArrayBuffer(file);
  }