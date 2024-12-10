public class LogicalDemo {
    public static void display(){
        integer day=4;
        Switch on day{
            when 1{
                System.debug('Its Sunday');
            }
            when 2{
                System.debug('Its Monday');
            }
            when 3{
                System.debug('Its Tuesday');
            }
            when 4{
                System.debug('Its Wednesday');
            }
            when 5{
                System.debug('Its Thursday');
            }
            when 6{
                System.debug('Its Friday');
            }
            when 7{
                System.debug('Its Saturday');
            }
            when else{
                System.debug('Choose Correctly.');
            }
        }
        
    }
}