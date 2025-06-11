namespace csAssement
{
    enum Colors
    {
        Red,
        Green,
        Blue
    }
    enum Patterns
    {
        striped,
        checkered,
        plain
    }
    internal class Program
    {
        static void Main(string[] args)
        {
            for (int i = 0; i < 3; i++) {

                for (int j = 0; j < 3; j++) {

                    Console.WriteLine(new Shirt((Colors)i,(Patterns) j));

                }

            }
        }
    }

    // i created it in 2 files but stuck it together so you can see it all at once 

    // also wasnt sure if you wanted me to save them first and then print so i did it the simple way

    //internal class Shirt
    //{
    //    public Colors color;
    //    public Patterns patterns;
    //    public Shirt(Colors col, Patterns patrn)
    //    {
    //        color = col;
    //        patterns = patrn;
    //    }

    //    public override string? ToString()
    //    {
    //        return $"This is a {color} and {patterns} shirt";
    //    }
    //}
}
