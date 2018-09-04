using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Admin.Models;
namespace Admin.Services
{
    public interface IQuestionServices
    {
        Task<List<Question>> GetAllQuestions();
        Task<Question> AddQuestion(Question question);
        Task<bool> DeleteQuestionById(string id);
        Task<bool> DeleteQuestionByDomain(string domain);
        Task EditQuestion(string id, Question question);
    }
}
