
document.getElementById('firstButton').onclick=function()
{
    function place(x1,y1,x2,y2,x3,y3)
    {
        count++;

        array[x1][y1]=count;
        array[x2][y2]=count;
        array[x3][y3]=count;
    }

    function tile(Size,x,y)
    {
        var HoleI,HoleJ;
        
        
        if(Size==2)         //If The Size Is 2x2
        {
            count++;
            
            for(var i=0;i<Size;i++)
                for(var j=0;j<Size;j++)
                    if(array[x+i][y+j]==0)
                        array[x+i][y+j]=count;

            return 0;
        }

        
        for(var i=x;i<(x+Size);i++)         //Find The Hole
            for(var j=y;j<(y+Size);j++)
                if(array[i][j]!=0)
                    HoleI=i,HoleJ=j;

        if((HoleI<(x+(Size/2)))&&(HoleJ<(y+(Size/2))))              //If The Hole Is In The Top Left
            place((x+(Size/2)),(y+(Size/2)-1),(x+(Size/2)),(y+(Size/2)),(x+(Size/2)-1),(y+(Size/2)));
        else if((HoleI>=(x+(Size/2)))&&(HoleJ<(y+(Size/2))))        //If The Hole Is In The Bottom Left
            place((x+(Size/2)-1),(y+(Size/2)),(x+(Size/2)),(y+(Size/2)),(x+(Size/2)-1),(y+(Size/2)-1));
        else if((HoleI<(x+(Size/2)))&&(HoleJ>=(y+(Size/2))))        //If The Hole Is In The Top Right
            place((x+(Size/2)),(y+(Size/2)-1),(x+(Size/2)),(y+(Size/2)),(x+(Size/2)-1),(y+(Size/2)-1));    
        else if((HoleI>=(x+(Size/2)))&&(HoleJ>=(y+(Size/2))))       //If The Hole Is In The Bottom Right
            place((x+(Size/2)-1),(y+(Size/2)),(x+(Size/2)),(y+(Size/2)-1),(x+(Size/2)-1),(y+(Size/2)-1));

        tile((Size/2),(x),(y+(Size/2)));            //Piece Top Right Quarter
        tile((Size/2),(x),(y));                     //Piece Top Left Quarter
        tile((Size/2),(x+(Size/2)),(y));            //Piece Bottom Left Quarter
        tile((Size/2),(x+(Size/2)),(y+(Size/2)));   //Piece Bottom Right Quarter

        return 0;
    }

    const range=128;
    var logRange=Math.log(range)/Math.log(2);
    var count=0,array=Array.from(Array(range),()=>Array(range).fill(0));

    var tableSize=document.getElementById('tableSize').value
    var row=document.getElementById('holeRow').value
    var col=document.getElementById('holeCol').value
    

    var check=true;

    for(var i=1;i<=logRange;i++)
        if(Math.pow(2,i)==tableSize)
            check=false;

    if(tableSize>128)
    {
        alert("The table was created by default as 16x16 because your size larger than 128.");
        tableSize=16;
    }
    else if((tableSize=="")||(tableSize==null)||(check))
    {
        alert("The table was created by default as 16x16 because you did not enter a 2ⁿ size.");
        tableSize=16;
    }
    
    if((row=="")||(row==null)||(row<=0)||(row>parseInt(tableSize))||(col=="")||(col==null)||(col<=0)||(col>parseInt(tableSize)))
    {
        alert("The filled box index will default to (1,1) because you did not enter a valid coordinate.");
        row=1;
        col=1;
    }
    
    array[row-1][col-1]=-1;
    tile(tableSize,0,0);

    var output='<table border="2" cellspacing="1" cellpadding="8" class="table">';
    function createTable(tableSize)
    {
        for(var i=0;i<tableSize;i++)
        {
            output=output+'<tr>';

            for(var j=0;j<tableSize;j++)
                if(array[i][j]==-1)
                    output=output+'<td></td>';
                else if(array[i][j]%3==0)   //For More Colourful Output
                    output=output+'<td bgcolor= "RGB('+array[i][j]+5+', '+array[i][j]+','+ array[i][j]+')">'+array[i][j]+'</td>';
                else if(array[i][j]%3==1)
                    output=output+'<td bgcolor= "RGB('+array[i][j]+', '+array[i][j]+5+','+ array[i][j]+')">'+array[i][j]+'</td>';
                else
                    output=output+'<td bgcolor= "RGB('+array[i][j]+', '+array[i][j]+','+ array[i][j]+5+')">'+array[i][j]+'</td>';

            output=output+'</tr>';
        }
        
        output=output+'</table>';

        document.getElementById('container').innerHTML=output;
    }
    createTable(tableSize)
}