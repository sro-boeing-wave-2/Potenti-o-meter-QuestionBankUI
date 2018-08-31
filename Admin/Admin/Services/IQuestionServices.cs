using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Admin.Models;
namespace Admin.Services
{
    public interface IQuestionServices
    {
        List<Question> GetAllQuestions();
        //Task<List<Question>> GetQuestionsByDomain(string domain);
        //Task<List<Question>> GetQuestionsByDifficultyLevel(int difficultylevel);
        void AddQuestion(Question question);
        //Task<bool> DeleteQuestionsByDomain(string domain);
        //Task<bool> DeleteQuestionById(string id);
        //Task<bool> DeleteQuestionByDomain(string domain);
        //Task EditQuestion(int id, Question question);
    }
}
