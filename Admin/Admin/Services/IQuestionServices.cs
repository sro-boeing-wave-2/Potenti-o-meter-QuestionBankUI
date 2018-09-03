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
        void AddQuestion(Question question);
        bool DeleteQuestionById(string id);
        bool DeleteQuestionByDomain(string domain);
        //void EditQuestion(int id, Question question);
    }
}
