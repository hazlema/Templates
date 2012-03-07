Number.implement(
{
    toRad: function()
    {
        return (Math.PI/180)*this;
    }
});

var myCanvas = new Class(
{
    Implements: [Options, Events],
    
    options:
    {
    },
		
	initialize: function(options)
	{
        if (options) this.setOptions(options);
        
        if (this.canvas = $('myCanvas')) 
        {
        	this.ctx = this.canvas.getContext('2d');  
        	this.size = 
        	{
        		height: this.canvas.get('height'),
        		width:  this.canvas.get('width'),
        		center:
        		{
        			x:	this.canvas.get('width') / 2,
        			y:  this.canvas.get('height') / 2
        		}
        	}

        	this.begin();
		} else {
			alert('Canvas element not detected');
		}
	},
	
	begin: function()
	{
		
		var i = new Image();
		i.src='http://lorempixel.com/'+this.size.width+'/'+this.size.height;
		i.addEvent('load', function() {
			this.ctx.drawImage(i, 0, 0);
			this.ctx.fillStyle='rgba(0,0,0,.5)';
			this.ctx.fillRect(10,10,this.size.width-20,this.size.height-20);
			this.ctx.translate(this.size.center.x, this.size.center.y);
			this.ctx.textAlign = 'center';
			this.ctx.font = '75px Helvetica bold';
			
			this.ctx.fillStyle='#fff';
			this.ctx.fillText('Blank Canvas', 0, 0);
		}.bind(this));
	}
});

window.addEvent('domready', function()
{
	new myCanvas();	
});
