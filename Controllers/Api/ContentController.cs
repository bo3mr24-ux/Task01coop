using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Task01.Data;

namespace Task01.Controllers.Api;

[ApiController]
[Route("api/content")]
[ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
public class ContentController : ControllerBase
{
    private readonly ApplicationDbContext _db;

    public ContentController(ApplicationDbContext db) => _db = db;

    // GET /api/content/settings
    [HttpGet("settings")]
    public async Task<IActionResult> Settings()
    {
        var s = await _db.ConferenceSettings.OrderBy(x => x.Id).FirstOrDefaultAsync();
        if (s is null) return Ok(new { });

        return Ok(new
        {
            startDate = s.ConferenceStartDate,
            startTime = s.ConferenceStartTime,
            endDate = s.ConferenceEndDate,
            endTime = s.ConferenceEndTime
        });
    }

    // GET /api/content/about
    [HttpGet("about")]
    public async Task<IActionResult> About()
    {
        var a = await _db.AboutConferences.OrderBy(x => x.Id).FirstOrDefaultAsync();
        return Ok(new { contentAr = a?.ContentAr ?? string.Empty });
    }

    // GET /api/content/agenda  -> grouped by day for the React AgendaSection
    [HttpGet("agenda")]
    public async Task<IActionResult> Agenda()
    {
        var items = await _db.AgendaItems
            .OrderBy(x => x.DayNumber).ThenBy(x => x.Order)
            .ToListAsync();

        var grouped = items
            .GroupBy(x => x.DayNumber)
            .Select(g => new
            {
                dayNumber = g.Key,
                items = g.Select(i => new { id = i.Id, title = i.Title, time = i.Time, order = i.Order })
            });

        return Ok(grouped);
    }

    // GET /api/content/speakers
    [HttpGet("speakers")]
    public async Task<IActionResult> Speakers()
    {
        var speakers = await _db.Speakers
            .OrderBy(x => x.Order)
            .Select(s => new { id = s.Id, name = s.Name, title = s.Title, imagePath = s.ImagePath, order = s.Order })
            .ToListAsync();

        return Ok(speakers);
    }

    // GET /api/content/objectives  -> ordered by Order ascending
    [HttpGet("objectives")]
    public async Task<IActionResult> Objectives()
    {
        var objectives = await _db.ConferenceObjectives
            .OrderBy(x => x.Order)
            .Select(o => new { id = o.Id, title = o.Title, description = o.Description, order = o.Order })
            .ToListAsync();

        return Ok(objectives);
    }
}
