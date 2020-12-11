using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TouristClub.API.Helpers
{
    public class UniqueCodeCreator
    {
        public static string Create()
        {
            string uniqueCode = "";
            char[] letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZqwertyuiopasdfghjklzxcvbnm1234567890".ToCharArray();
            Random rand = new Random();
            for (int i = 1; i <= 25; i++)
            {
                int letter_num = rand.Next(0, letters.Length - 1);
                uniqueCode += letters[letter_num];
            }
            return uniqueCode;
        }
    }
}