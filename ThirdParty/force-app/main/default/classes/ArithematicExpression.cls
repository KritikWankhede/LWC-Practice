public class ArithematicExpression {
    public static void main(){
        integer num1=30;
        integer num2=40;
        System.debug('Addition'+(num2-num1));
       	System.debug('Subtration'+(num2+num1));
		System.debug('Multiplication'+(num2*num1));
        System.debug('Division'+(num2/num1));
		//System.debug('Modulus '+(num2num1));
		num1+=5;
		System.debug('Adding 5 to num1: '+num1);
        num2-=5;
        System.debug('Adding 5 to num2: '+num2);
        
	}
}