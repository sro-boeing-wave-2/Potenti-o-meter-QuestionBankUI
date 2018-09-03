using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Admin.Services;
using Admin.Models;
using Newtonsoft.Json;

namespace Admin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        private readonly IQuestionServices _questionService;
        public QuestionsController(IQuestionServices questionService)
        {
            _questionService = questionService;
            
            
        }
        [HttpGet]
        public List<Question> Get()
        {
            return _questionService.GetAllQuestions();
        }

        [HttpPost]
        public void PostQuestion([FromBody] dynamic question) 
        {
            if (!ModelState.IsValid)
            {
                
            }

            
            var questionAsJsonString = JsonConvert.SerializeObject(question);
            string type = question.questionType;
            switch (type)
            {
                case "MCQType":     
                        MCQType mcqType = JsonConvert.DeserializeObject<MCQType>(questionAsJsonString);
                        _questionService.AddQuestion(mcqType);
                    break;

                case "MMCQType":
                    
                    MMCQType mmcqType = JsonConvert.DeserializeObject<MMCQType>(questionAsJsonString);
                    _questionService.AddQuestion(mmcqType);
                    break;

                case "FillBlanks":

                    FillBlanks fillBlanks = JsonConvert.DeserializeObject<FillBlanks>(questionAsJsonString);
                    _questionService.AddQuestion(fillBlanks);
                    break;

                default:
                    TrueFalse trueFalse = JsonConvert.DeserializeObject<TrueFalse>(questionAsJsonString);
                    _questionService.AddQuestion(trueFalse);
                    break;
            }

        }

        [HttpDelete("id/{id}")]
        public IActionResult DeleteQuestion([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var question = _questionService.DeleteQuestionById(id);
            if (question == false)
            {
                return NotFound();
            }

            return Ok(question);
        }

        [HttpDelete("{domain}")]
        public IActionResult DeleteQuestionId([FromRoute] string domain)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var question = _questionService.DeleteQuestionByDomain(domain);
            if (question == false)
            {
                return NotFound();
            }

            return Ok(question);
        }
        [HttpPut("{id}")]
        public IActionResult PutNote([FromRoute] string id, [FromBody] dynamic question)
        {
           
            var questionAsJsonString = JsonConvert.SerializeObject(question);
            string type = question.questionType;
            switch (type)
            {
                case "MCQType":
                    MCQType mcqType = JsonConvert.DeserializeObject<MCQType>(questionAsJsonString);
                    mcqType.QuestionId = id;
                    _questionService.EditQuestion(id, mcqType);
                    break;

                case "MMCQType":

                    MMCQType mmcqType = JsonConvert.DeserializeObject<MMCQType>(questionAsJsonString);
                    mmcqType.QuestionId = id;
                    _questionService.EditQuestion(id, mmcqType);
                    break;

                case "FillBlanks":

                    FillBlanks fillBlanks = JsonConvert.DeserializeObject<FillBlanks>(questionAsJsonString);
                    fillBlanks.QuestionId = id;
                    _questionService.EditQuestion(id, fillBlanks);
                    break;

                default:
                    TrueFalse trueFalse = JsonConvert.DeserializeObject<TrueFalse>(questionAsJsonString);
                    trueFalse.QuestionId = id;
                    _questionService.EditQuestion(id, trueFalse);
                    break;
            }



            return Ok();
        }
    }
}