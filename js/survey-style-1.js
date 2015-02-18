$(function(){
  
  var step = 1;
  
  $("#form-field-1 span").click(function(){
    $("#form-field-1 span").removeClass("active");
    $(this).children(".radio").prop("checked",true);
    $(this).addClass("active");
  });
  
  $("#part2 .swq span").click(function(){
    $(this).parent().children("span").removeClass("active");
    $(this).children(".radio").prop("checked",true);
    $(this).addClass("active");
  });
  
  $(".next").click(function(){
    
    if(step==1)
    {
      if($("#part1 span.active").length>0 && $("#part1 .dolls input").val()!=''){
          $("#error").slideUp(100);
        
        
          $("#overflow").animate({
		    	height: "519px"
		      }, 500, function(){
            
            $("#steps").html("Step 1 <span>&raquo;</span> <strong>Step 2</strong> <span>&raquo;</span> Step 3 <span>&raquo;</span> Step 4 <span>&raquo;</span> Step 5 <span>&raquo;</span> Finish");
            
            $("#slider").animate({
		    	  marginLeft: "-660px"
		        }, 200, function(){ step=2; } );
          
          } );
        
        
        
          
      }
      else {
         $("#error").slideDown(100);
      }
    }
    
    
    if(step==2)
    {
      if($("#part2 span.active").length>5){
          $("#error").slideUp(100);
        
        
          $("#overflow").animate({
		    	height: "130px"
		      }, 500, function(){
            
            $("#steps").html("Step 1 <span>&raquo;</span> Step 2 <span>&raquo;</span> <strong>Step 3</strong> <span>&raquo;</span> Step 4 <span>&raquo;</span> Step 5 <span>&raquo;</span> Finish");
            
            $("#slider").animate({
		    	  marginLeft: "-1320px"
		        }, 200, function(){ step=3; } );
          
          } );
        
        
        
          
      }
      else {
         $("#error").slideDown(100);
      }
    }
    
     if(step==3)
    {
        
        
          $("#slider").animate({
		    	marginLeft: "-1980px"
		      }, 500, function(){
            
            $("#steps").html("Step 1 <span>&raquo;</span> Step 2 <span>&raquo;</span> Step 3 <span>&raquo;</span> <strong>Step 4</strong> <span>&raquo;</span> Step 5 <span>&raquo;</span> Finish");
             step=4;
          
          } );
        
        
        
          
      
    }
    
    
    if(step==4)
    {
      if($("#part4 #Field107").val()!=''){
          $("#error").slideUp(100);
        
        
          $("#overflow").animate({
		    	height: "200px"
		      }, 500, function(){
            
            $("#steps").html("Step 1 <span>&raquo;</span> Step 2 <span>&raquo;</span> Step 3 <span>&raquo;</span> Step 4 <span>&raquo;</span> <strong>Step 5</strong> <span>&raquo;</span> Finish");
            
            $("#slider").animate({
		    	  marginLeft: "-2640px"
		        }, 200, function(){ step=5; $("#choice .next").html("&raquo; Submit");}  );
          
          } );
        
        
        
          
      }
      else {
         $("#error").slideDown(100);
      }
    }
	
	 if(step==5)
    {
      if($("#part5 #Field105").val()!='' && $("#part5 #Field106").val()!='' && $("#part5 #Field110").val()!='' && $("#part5 #Field117").val()!=''){
          $("#error").slideUp(100);
        
        
          $("#overflow").animate({
		    	height: "210px"
		      }, 50, function(){
            
            $("#steps").html("Step 1 <span>&raquo;</span> Step 2 <span>&raquo;</span> Step 3 <span>&raquo;</span> Step 4 <span>&raquo;</span> Step 5 <span>&raquo;</span> <strong>Finish</strong>");
            
            $("#slider").animate({
		    	  marginLeft: "-3300px"
		        }, 200, function(){ step=6; $("#choice").slideUp(100);});
          
          });

      }
      else {
         $("#error").slideDown(100);
      }
    }
    
    

  
    
    
  });
  
});