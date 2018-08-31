using System;
using System.Collections.Generic;
using Microsoft.Extensions.Options;
using System.Linq;
using System.Threading.Tasks;
using Admin.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using Admin.Data;
namespace Admin.Services
{
    public class QuestionServices: IQuestionServices
    {
        private readonly QuestionContext _context = null;
        public QuestionServices(IOptions<Settings> settings)
        {
            _context = new QuestionContext(settings);
        }
        public List<Question> GetAllQuestions()
        {
            return _context.Questions.Find(x => true).ToList();
        }
        //public async Task<List<Question>> GetQuestionsByDomain(string domainchoice)
        //{
        //    return await _context.Questions.Find(x => x.domain == domainchoice).ToListAsync();
        //}
        //public async Task<List<Question>> GetQuestionsByDifficultyLevel(int difficultylevel)
        //{
        //    return await _context.Questions.Find(x => x.difficultyLevel == difficultylevel).ToListAsync();
        //}
        public void AddQuestion(Question question)
        {
            _context.Questions.InsertOne(question);
        }
        //public async Task<bool> DeleteQuestionsByDomain(string domain)
        //{
        //    DeleteResult actionResult = await _context.Questions.DeleteManyAsync(Builders<Question>.Filter.Eq("domain", domain));
        //    return actionResult.IsAcknowledged && actionResult.DeletedCount > 0;
        //}
        //public async Task<bool> DeleteQuestionById(string id)
        //{
        //    DeleteResult actionResult = await _context.Questions.DeleteOneAsync(Builders<Question>.Filter.Eq("questionId", id));
        //    return actionResult.IsAcknowledged && actionResult.DeletedCount > 0;
        //}
        
        //public async Task EditQuestion(int id, Question question)
        //{
        //    Console.WriteLine(question);
        //    var filter = Builders<Question>.Filter.Eq(x => x.questionId, id);
        //    var update = Builders<Question>.Update.Set(x => x.domain, question.domain).Set(x => x.T, note.Text).Set(x => x.IsPinned, note.IsPinned).Set(x => x.Labels, note.Labels).Set(x => x.Checklists, note.Checklists);
        //    var result = await _context.Notes.UpdateOneAsync(filter, update);

        //}
    }
}
