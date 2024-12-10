public class StaticBlock {
    static{
        System.debug('I am first static block.');
    }
    public static void main(){
        System.debug('I am main method');
    }
    static{
        System.debug('I am second static block.');
    }
}