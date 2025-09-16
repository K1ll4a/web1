public class Checker {
    public static boolean hit(float x , int y, float r){
        return  inRect(x,y,r) || inTriangle(x,y,r) || inCircle(x,y,r);
    }

    private static boolean inRect(float x, int y, float r){
        return x >=0 && y <=0 && x <= r && y >= -r/2;
    }

    private  static boolean inTriangle(float x , int y ,float r){
        return x <= 0 && y >= 0 &&  x >=  -r/2 &&  y<= r/2 && y >= -x - r/2;
    }

    private  static boolean inCircle(float x , int y , float r){
        return  x>= 0 && y >= 0 && x<=r && y<=r && x*x + y*y <= r*r;
    }
}
