function process_file(file){
    //output 
    var output = [];
    
    // parsing the first line as keys
    var head = file.split('\n')[0].split(',')
    // collecting the values from the rest of the lines
    var body = file.split('\n')
    
    var r = /(["A-Z], )/gi
    
    // looping based on the first line as keys
    for (var i=1; i < body.length; i++){
        try{
            
        //1, 2, 3
        //1, 2, 3, 4
        var b = body[i]
        var obj = {}
     
        for(var j=0; j < head.length; j++){  
            
            //0, 1, 2, 3
            //0, 1, 2, 3, 4
            
        // getting the key from the string
        var key = head[j]
        // getting the corresponding body
        if(b.includes('"') ){
            // parsing with regex
            var value = b.replace(r, ' ').split(',')[j]
        } else{
        
        // parsing the value for the key
        var value = b.split(',')[j]
        }
        
        // computing the object before outputing
        obj[key] = value
            
        }
        // adding to the output object
        output.push(obj)
            
        }catch(error){
            //error handling
            return "Something went wrong! 😒"
        }
    }
    
    
    return output;
}
var file = `product_id,name,description,price
1,book,math text book,$99
2,spoon,for cooking,$10
3,ball,"base ball, football",$100`;
console.log(process_file(file));
// [
//      {
//          "product_id":1,
//          "name":"book",
//          "description":"math text book",
//          "price":"$99"
//      },
//      {
//          "product_id":2,
//          "name":"spoon",
//          "description":"for cooking",
//          "price":"$10"
//      },
//      {
//          "product_id":3,
//          "name":"ball",
//          "description":"base ball, football",
//          "price":"$100"
//      }
//  ]
var file2 = `matric no,Phone no,Name,Score,grade
unl/3/01, 08023454564, Tosin Babafemi,10, failed
unl/3/02,08023454562, Remi Kemi,80, passed
unl/3/03, 0802345412, "Victor, Haven",90, passed`;
console.log(process_file(file2));
// [
//     {
//         "matric no":"unl/3/01",
//         "Phone no":"08023454564",
//         "Name":"Tosin Babafemi",
//         "Score":10,
//         "grade":"failed"
//     },
//     {
//         "matric no":"unl/3/02",
//         "Phone no":"08023454562",
//         "Name":"Remi Kemi",
//         "Score":80,
//         "grade":"passed"
//     },
//     {
//         "matric no":"unl/3/03",
//         "Phone no":"0802345412",
//         "Name":"Victor, Haven",
//         "Score":90,
//         "grade":"passed"
//     }
// ]