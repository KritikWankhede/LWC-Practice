public class FirstClass {
    public static void firstClass(){
		Integer sname=12;
		Integer sum=sumReturn(sname);
        System.debug(sum);
        List<Integer> lit=new List<Integer>{};
        lit.add(12);
       	lit.add(23);
        lit.add(34);
        lit.add(52);
        Integer listSum=0;
        for(Integer i=0;i<lit.size();i++){
           listSum+=lit.get(i);
        }
    	System.debug('List Sum is '+listSum);
    }
    public static Integer sumReturn(Integer range){
        Integer sum=0;
        for(Integer i=1;i<range;i++){
            sum+=i;
        }
        return sum;
    }
}